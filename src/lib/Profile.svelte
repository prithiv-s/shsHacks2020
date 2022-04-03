<script lang="ts">
	import { getAuth } from 'firebase/auth';
	import app from '../core/firebaseServices';

	const auth = getAuth(app);

	let email: string;

	auth.onAuthStateChanged((user) => {
		if (user) {
			email = user.email;
		}
	});
</script>

<div class="m-10">
	<h1 class="text-2xl">Your Profile</h1>
	<br />
	<h1>Email: {email}</h1>
	<h1>You have created 33 lists</h1>
	<br />
	<button
		type="button"
		on:click={() => {
			auth.signOut().then(() => {
				window.location.href = 'https://HackVocab.vercel.app';
			});
		}}
		class="focus:outline-none text-white bg-red-700 hover:bg-red-900 transition focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-2"
	>
		Logout
	</button>
</div>
