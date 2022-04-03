<script lang="ts">
	import { page } from '$app/stores';
	import { getAuth } from 'firebase/auth';
	import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
	import { onDestroy } from 'svelte';
	import app from '../../core/firebaseServices';
	import type UserModel from '../../core/UserModel';
	const listName = decodeURI($page.params['slug']);

	const auth = getAuth(app);
	const db = getFirestore(app);

	let words: { [word: string]: string } = {};
	let shouldCheck = false;
	let answers = [];

	auth.onAuthStateChanged((user) => {
		if (user) {
			const unsub = onSnapshot(doc(db, 'users', user.email), (doc) => {
				const data = doc.data() as UserModel;

				words = data.lists[listName];

				Object.keys(words).forEach(() => answers.push(''));

				onDestroy(() => {
					unsub();
				});

				words = words;
			});
		}
	});

	function shuffle(array: string[]) {
		let counter = array.length;

		while (counter > 0) {
			let index = Math.floor(Math.random() * counter);

			counter--;

			let temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	}

	$: shuffledKeys = shuffle(Object.keys(words));
</script>

<form class="m-10">
	{#each shuffledKeys as w, i}
		<div class="relative z-0 mb-6 w-full group">
			<input
				type="email"
				name="floating_{w}"
				class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				bind:value={answers[i]}
				required
			/>
			<label
				for="floating_{w}"
				class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>{words[w]}</label
			>
			{#if shouldCheck}
				{#if w == answers[i]}
					<p class="mt-2 text-sm text-green-600 dark:text-green-500">
						<span class="font-medium">Correct!</span>
					</p>
				{:else}
					<p class="mt-2 text-sm text-red-600 dark:text-red-500">
						<span class="font-medium">Incorrect!</span> The answer is {w}.
					</p>
				{/if}
			{/if}
		</div>
	{/each}
	<button
		type="submit"
		on:click={(e) => {
			e.preventDefault();
			shouldCheck = true;
		}}
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	>
		Check Answers
	</button>
</form>
