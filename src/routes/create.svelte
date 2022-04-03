<script lang="ts">
	import { getAuth, type User } from 'firebase/auth';
	import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
	import ocr from '../core/ocr';
	import type UserModel from 'src/core/UserModel';
	import { onDestroy } from 'svelte';
	import app from '../core/firebaseServices';

	let word: string;
	let words: string[] = [];
	let definitions: string[] = [];
	let scannedWords: string[] = [];
	let selectedRule;

	let listName = `List ${Math.random().toString(16).substring(2, 8)}`;
	let user: User;
	let userData: UserModel;
	let ruleNames: string[] = [];

	let isModalOpen = false;

	function reformat(s: string) {
		let output = '';

		[...s].forEach((c, i) => {
			if (c != '\n') {
				output += c;
			} else {
				if (s.charAt(i - 1) == '.') {
					output += c;
				} else {
					output += ' ';
				}
			}
		});

		return output;
	}

	function ruleToRegex(r: string) {
		let rule = r;
		rule = rule.replace('(word)', '([a-z]+)');
		rule = rule.replace('(def)', '(.+)');

		return RegExp(rule);
	}

	function getOrder(r: string) {
		let order = [];

		if (r.indexOf('(word)') != -1 && r.indexOf('(def)') != -1) {
			if (r.indexOf('(word)') < r.indexOf('(def)')) {
				order = ['w', 'd'];
			} else {
				order = ['d', 'w'];
			}
		}

		return order;
	}

	function parse() {
		if (selectedRule) {
			const parser = ruleToRegex(userData.rules[ruleNames.indexOf(selectedRule)]);

			const order = getOrder(userData.rules[ruleNames.indexOf(selectedRule)]);

			scannedWords.forEach((sw) => {
				const matches = sw.match(parser);

				if (order[0] == 'w') {
					words.push(matches[1]);
					definitions.push(matches[2]);
				} else {
					words.push(matches[2]);
					definitions.push(matches[1]);
				}

				words = words;
			});

			isModalOpen = false;
		}
	}

	async function scanImage(files: FileList) {
		if (files != undefined) {
			const text = await ocr(files);
			scannedWords = reformat(text).split('\n');
			scannedWords = scannedWords.filter((x) => x != '\f' && x != '\n');
			isModalOpen = true;
		}
	}

	let files: FileList;

	$: scanImage(files);

	let fileInput: HTMLInputElement;

	const auth = getAuth(app);
	const db = getFirestore(app);

	auth.onAuthStateChanged((u) => {
		if (u) {
			user = u;

			const unsub = onSnapshot(doc(db, 'users', user.email), (doc) => {
				const data = doc.data() as UserModel;
				userData = data;
				ruleNames = data.ruleNames;

				onDestroy(() => {
					unsub();
				});
			});
		}
	});

	const addWord = () => {
		if (word) {
			fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
				.then((response) => response.json())
				.then((data) => {
					const def = data[0]['meanings'][0]['definitions'][0]['definition'];
					definitions.push(def);
					words.push(word);
					words = words;
					word = '';
				});
		}
	};
</script>

<div class="m-10 flex flex-col items-center h-[90vh]">
	<h1 class="w-full focus:outline-none mb-4 text-xl" bind:textContent={listName} contenteditable>
		Hi
	</h1>
	<div class="flex items-center w-full justify-center">
		<input
			type="text"
			bind:value={word}
			on:keyup={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					addWord();
				}
			}}
			class="bg-gray-50 w-3/5 border border-gray-300 text-gray-900 z-10 text-sm rounded-lg rounded-r-none focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Add a word, e.g. 'apple'. HackVocab will automatically define it for you."
		/>
		<button
			type="button"
			on:click={addWord}
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg rounded-l-none border border-blue-700 text-sm px-6 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
		>
			Add
		</button>
	</div>
	<div class="flex items-center w-3/5 mt-8">
		<button
			type="button"
			on:click={() => {
				fileInput.click();
			}}
			class="text-white h-14 bg-blue-400 hover:bg-blue-500 transition focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg rounded-r-none text-sm px-6 w-1/2 py-2.5 "
		>
			Scan an image
		</button>
		<button
			type="button"
			on:click={async () => {
				const listData = {};
				listData[listName] = {};

				words.forEach((word, i) => {
					listData[listName][word] = definitions[i];
				});

				await setDoc(doc(db, 'users', user.email), {
					...userData,
					lists: {
						...userData.lists,
						...listData
					}
				});
			}}
			class="w-1/2 py-2.5 h-14 px-6 text-sm font-medium text-gray-900 focus:outline-none bg-gray-200 rounded-lg rounded-l-none border border-gray-200 hover:bg-gray-300 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
		>
			Save list
		</button>
		<input class="hidden" type="file" bind:this={fileInput} bind:files />
	</div>
	<ul
		class="w-full mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
	>
		{#each words as word, i}
			{#if words.length - 1 == i}
				<li
					class="w-full px-4 py-2 cursor-pointer"
					on:click={() => {
						const newDef = prompt('Change definition to:');
						definitions[i] = newDef;
					}}
				>
					{word}: {definitions[i]}
				</li>
			{:else}
				<li
					class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 cursor-pointer"
					on:click={() => {
						const newDef = prompt('Change definition to:');
						definitions[i] = newDef;
					}}
				>
					{word}: {definitions[i]}
				</li>
			{/if}
		{/each}
	</ul>
</div>

<div
	class="{!isModalOpen &&
		'hidden'} z-20 bg-black bg-opacity-50 fixed w-screen h-screen top-0 left-0 flex justify-center items-center overflow-y-scroll"
>
	<div
		tabindex="-1"
		aria-hidden={!isModalOpen}
		class="overflow-y-scroll overflow-x-hidden z-50 md:inset-0 focus:outline-none"
	>
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">Scanner</h3>
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						on:click={() => (isModalOpen = false)}
					>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						>
					</button>
				</div>
				<div class="p-6 space-y-6">
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						HackVocab detected {scannedWords.length}
						{scannedWords.length != 1 && 'different'} word{scannedWords.length != 1 && 's'} in your image:
						<br />
						<br />
						{#each scannedWords as sw}
							- {sw}
							<br />
						{/each}
					</p>
					<p>Select a parser to use:</p>
					<select
						bind:value={selectedRule}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						{#each ruleNames as rn}
							<option>{rn}</option>
						{/each}
					</select>
				</div>
				<div
					class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
				>
					<button
						on:click={parse}
						type="button"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Parse!</button
					>
				</div>
			</div>
		</div>
	</div>
</div>
