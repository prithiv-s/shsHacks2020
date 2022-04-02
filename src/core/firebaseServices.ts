import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAeVyQzA9PEkrvdiNrBIIbqEwHcn6b6YN4',
	authDomain: 'hack-acab.firebaseapp.com',
	projectId: 'hack-acab',
	storageBucket: 'hack-acab.appspot.com',
	messagingSenderId: '140135659986',
	appId: '1:140135659986:web:13049670b61110faf4300b'
};

const app = initializeApp(firebaseConfig);

export default app;
