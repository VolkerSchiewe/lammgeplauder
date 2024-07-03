import getEpisodes from "../../../libs/db/episodes";
import { firestore } from "firebase-admin";

export async function GET() {
  console.info("get all episodes");
  const episodes = await getEpisodes();
  return Response.json(episodes);
}

export async function POST(request: Request) {
  const data = await request.json();
  console.info("new episode", data);
  await firestore()
    .collection(process.env.FIREBASE_PODCAST_DOCUMENT as string)
    .add(data);
  return new Response("Saved", { status: 201 });
}
