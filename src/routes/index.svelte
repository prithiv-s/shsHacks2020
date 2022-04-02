<script>
	import ocr from '../core/ocr';

	let files;

	$: ocr(files);
</script>

<input type="file" bind:files />
