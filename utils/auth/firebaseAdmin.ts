import * as admin from 'firebase-admin'

export function initFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${ process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID }.firebaseio.com`,
    })
  }
}

export function verifyIdToken(token: string) {
  initFirebaseAdmin()
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error
    })
}
