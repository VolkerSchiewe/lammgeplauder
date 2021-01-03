import React from "react";
import initFirebase from "../utils/auth/initFirebase";
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import mapUserData from "../utils/auth/mapUserData";
import { setUserCookie } from "../utils/auth/userCookies";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

initFirebase()

const firebaseAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'redirect',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: '/admin',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: ({ user }) => {
      mapUserData(user).then(userData => setUserCookie(userData))
      return true
    },
  },
}
const Auth = () => {
  return (
    <StyledFirebaseAuth
      uiConfig={ firebaseAuthConfig }
      firebaseAuth={ firebase.auth() }
    />
  )
}

export default Auth
