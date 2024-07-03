"use client";

import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { firebaseAuth } from "./config";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle(): Promise<{
  uid: string;
  token: string;
  email: string | null;
}> {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(firebaseAuth, provider);
  if (!result || !result.user) {
    throw new Error("Google sign in failed");
  }
  return { uid: result.user.uid, email: result.user.email, token: await result.user.getIdToken() };
}

export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
