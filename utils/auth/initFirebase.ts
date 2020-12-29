import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: `${ process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN }.firebaseapp.com`,
  databaseURL: `https://${ process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID }.firebaseio.com`,
  storageBucket: `${ process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID }.appspot.com`
}

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}
