import { getStorage, ref, uploadBytes } from 'firebase/storage';
import app from './firebaseServices';

const storage = getStorage(app);

export default function ocr(files: FileList) {
	// For initial state
	if (files == undefined) {
		return;
	}

	// Get file, create ref
	const file = files[0];
	const storageRef = ref(storage, 'img.png');

	return new Promise<string>((resolve, reject) => {
		// Upload file to firestore
		uploadBytes(storageRef, file).then(() => {
			// Perform OCR (Optical Character Recognition) on image
			fetch('https://Hackacab-Backend.burntcofee.repl.co/api/')
				.then((response) => response.json())
				.then((json) => {
					const text = json['text'];
					resolve(text);
				})
				.catch((e) => {
					reject(e);
				});
		});
	});
}
