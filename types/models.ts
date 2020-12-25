import { firestore } from "firebase-admin/lib/firestore";

export interface Podcast {
  name: string
  description: string
  homepageBackgroundColor: string
  logoUrl: string
  logoAlt: string
}

export interface Episode {
  name: string,
  audio: {
    mimeType: string;
    size: string;
    url: string
    duration: number
    md5Hash: string
  },
  description: string
  updatedAt: firestore.Timestamp
}
