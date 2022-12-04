import "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import initFirebase from "../utils/auth/initFirebase";
import mapUserData from "../utils/auth/mapUserData";
import { setUserCookie } from "../utils/auth/userCookies";

initFirebase()

const firebaseAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'redirect',
  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
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
      firebaseAuth={ getAuth() }
    />
  )
}

export default Auth
