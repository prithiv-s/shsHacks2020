<script>
	import AuthProtected from '$lib/AuthProtected.svelte';
	// import Profile from '$lib/profile.svelte';
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
	import app from '../core/firebaseServices';

	const auth = getAuth(app);

	let email = '';
	let password = '';
</script>

<AuthProtected>
	<span slot="no-auth">
		<div class="flex justify-center items-center h-[90vh]">
			<div
				class="p-4 w-3/5 md:w-2/5 bg-white rounded-lg border border-gray-200 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
			>
				<form
					class="space-y-6"
					on:submit={(e) => {
						e.preventDefault();

						signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
							const user = userCredential.user;
							console.log(user.email);
						});
					}}
				>
					<h5 class="text-xl font-medium text-gray-900 dark:text-white">Login to HackVocab</h5>
					<div>
						<label
							for="email"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>Your email</label
						>
						<input
							type="email"
							name="email"
							id="email"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="bob@example.com"
							bind:value={email}
							required
						/>
					</div>
					<div>
						<label
							for="password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>Your password</label
						>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							bind:value={password}
							required
						/>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Login</button
					>
					<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
						Don't have an account? <a
							href="/sign-up/"
							class="text-blue-700 hover:underline dark:text-blue-500">Sign up</a
						>
					</div>
				</form>
			</div>
		</div>
	</span>
	<span slot="auth">
		<!-- <Profile /> -->
		<h1 />
	</span>
</AuthProtected>
