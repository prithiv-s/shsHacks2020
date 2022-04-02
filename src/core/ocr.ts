import { getStorage, ref, uploadBytes } from 'firebase/storage';
import app from './firebaseServices';

const storage = getStorage(app);

export default function ocr(files: File[]) {
	// For initial state
	if (files == undefined) {
		return;
	}

	// Get file, create ref
	const file = files[0];
	const storageRef = ref(storage, 'img.png');

	// Upload file to firestore
	uploadBytes(storageRef, file).then(() => {
		// Perform OCR (Optical Character Recognition) on image
		fetch('https://hackacab-backend.burntcofee.repl.co/api/')
			.then((response) => response.json())
			.then((json) => {
				const text = json['text'];
				console.log(text);
			});
	});
}
