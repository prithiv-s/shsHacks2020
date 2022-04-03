<script lang="ts">
	import help from '$lib/assets/help.png';

	let isHelpOpen = false;
</script>

<div class="flex flex-row justify-center items-center h-[90vh]">
	<ul
		class="w-48 h-3/5 p-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 border-r-transparent rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
	>
		<li class="rule">Profile</li>
		<li class="rule">Settings</li>
		<li class="rule">Messages</li>
		<li class="rule">Download</li>
	</ul>
	<div
		class="w-3/5 md:w-2/5 h-3/5 overflow-y-scroll bg-white border border-gray-200 rounded-r-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
	>
		<div
			class="flex flex-row items-center justify-between p-4 bg-blue-400 rounded-tr-md text-gray-50"
		>
			<span>Parser Editor</span>
			<span class="cursor-pointer hover:contrast-150 transition active:contrast-200">
				<img alt="help icon" width={24} src={help} on:click={() => (isHelpOpen = true)} />
			</span>
		</div>
		<textarea class="w-full h-full resize-none focus:outline-none p-4 font-mono font-extralight" />
	</div>
</div>

<div
	class="{!isHelpOpen &&
		'hidden'} bg-black bg-opacity-50 fixed w-screen h-screen top-0 left-0 flex justify-center items-center"
>
	<div
		tabindex="-1"
		aria-hidden={!isHelpOpen}
		class="overflow-y-auto overflow-x-hidden z-50 md:inset-0 focus:outline-none"
	>
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
						A Quick Guide to Parsers
					</h3>
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						on:click={() => (isHelpOpen = false)}
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
						Hackacab works by scanning an image, and extracting all the words from it. However, it
						needs a way to convert these words into data it can use. And that's where parsers come
						in.
					</p>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						Parsers define a way for Hackacab to extract features like the word, its definitions,
						and example sentences from text. While parsers may seem intimidating, they're really
						just an extension to regular expressions.
					</p>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						Consider the following parser:
						<br />
						<code>(word)</code>
					</p>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						This is the simplest possible parser, extracting only the word and leaving the rest to
						Hackacab. But what if the text you're scanning includes a definition too? The '$def'
						directive will take care of that. The following example parses a word and a definition
						separated by a colon and a space:
						<br />
						<code>(word): (def)</code>
					</p>
				</div>
				<div
					class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
				>
					<button
						on:click={() => (isHelpOpen = false)}
						type="button"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Start using Parsers!</button
					>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.rule {
		@apply w-full px-4 py-3 rounded-md transition cursor-pointer;
	}

	.rule:hover {
		@apply bg-blue-50 text-blue-700;
	}

	.rule:active {
		@apply bg-blue-100;
	}
</style>
