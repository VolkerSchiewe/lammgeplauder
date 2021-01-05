import firebase from "firebase/app";

export interface UserData {
  id: string
  email: string | null
  token: string
}

export default async function mapUserData(user: firebase.User): Promise<UserData> {
  const { uid, email } = user
  const token = await user.getIdToken(true)
  return {
    id: uid,
    email,
    token,
  }
}
