import { firestore } from "firebase-admin";
import { initFirebaseAdmin } from "../../../../libs/firebase/firebaseAdmin";

initFirebaseAdmin();

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  console.info("set episode");
  const data = await request.json();
  const oldData = (
    await firestore()
      .collection(process.env.FIREBASE_PODCAST_DOCUMENT as string)
      .doc(params.id)
      .get()
  ).data();
  const updatedData = { ...oldData, ...data };
  await firestore()
    .collection(process.env.FIREBASE_PODCAST_DOCUMENT as string)
    .doc(params.id)
    .set(updatedData);
  return new Response("Saved");
}
