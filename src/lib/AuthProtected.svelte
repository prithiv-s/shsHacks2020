<script lang="ts">
	import { getAuth } from 'firebase/auth';
	import app from '../core/firebaseServices';

	const auth = getAuth(app);

	let shouldShow: boolean;
	let show = false;

	$: show = shouldShow;

	auth.onAuthStateChanged((user) => {
		if (user) {
			shouldShow = true;
		} else {
			shouldShow = false;
		}
	});
</script>

{#if show}
	<slot name="auth" />
{:else}
	<slot name="no-auth" />
{/if}
