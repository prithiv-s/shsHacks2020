<script lang="ts">
	import AuthProtected from '$lib/AuthProtected.svelte';
	import { getAuth } from 'firebase/auth';
	import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
	import type UserModel from 'src/core/UserModel';
	import { onDestroy } from 'svelte';
	import app from '../core/firebaseServices';

	const auth = getAuth(app);
	const db = getFirestore(app);

	let listNames: string[] = [];

	auth.onAuthStateChanged((user) => {
		if (user) {
			const unsub = onSnapshot(doc(db, 'users', user.email), (doc) => {
				const data = doc.data() as UserModel;

				listNames = Object.keys(data.lists);

				onDestroy(() => {
					unsub();
				});
			});
		}
	});
</script>

<AuthProtected>
	<span slot="auth">
		<div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 m-10">
			<a
				href="/create/"
				class="flex items-center justify-center p-6 max-w-sm bg-blue-500 rounded-lg border-gray-50 border-4 shadow-lg active:shadow-none hover:bg-blue-600 transition"
			>
				<h5 class="mb-2 text-2xl font-medium tracking-tight text-white">Create List</h5>
			</a>

			{#each listNames as listName}
				<a
					href="/view/{listName}/"
					class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
				>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{listName}
					</h5>
				</a>
			{/each}
		</div>
	</span>
	<span slot="no-auth">
		<div class="flex justify-center items-center h-[90vh]">
			<h1>Please login to access this page.</h1>
		</div>
	</span>
</AuthProtected>
