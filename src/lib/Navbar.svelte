<script lang="ts">
	let dropdownOpen = false;

	const routes = ['/', '/dashboard', '/parsers'];
	const routeNames = ['Home', 'Dashboard', 'Parsers'];
</script>

<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
	<div class="container flex flex-wrap justify-between items-center mx-auto">
		<a href="https://flowbite.com" class="flex items-center">
			<img
				src="https://flowbite.com/docs/images/logo.svg"
				class="mr-3 h-6 sm:h-9"
				alt="Flowbite Logo"
			/>
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>Hackacab</span
			>
		</a>
		<div class="flex items-center md:order-2">
			<a
				href="/log-in/"
				role="button"
				class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
			>
				<span class="sr-only">Open user menu</span>
				<img
					class="w-8 h-8 rounded-full"
					src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
					alt="profile"
				/>
			</a>
			<button
				type="button"
				class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				on:click={() => (dropdownOpen = !dropdownOpen)}
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/></svg
				>
				<svg
					class="hidden w-6 h-6"
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
		<div
			class="{!dropdownOpen &&
				'hidden'} justify-between items-center w-full md:flex md:w-auto md:order-1"
		>
			<ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
				{#each routes as route, i}
					<li>
						<a
							href={route}
							class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-blue-100 md:border-0 md:hover:text-blue-700 md:px-3 md:py-2 md:rounded md:transition dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>{routeNames[i]}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
