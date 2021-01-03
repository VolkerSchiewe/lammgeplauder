import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import { getUserFromCookie, removeUserCookie, setUserCookie, } from './userCookies'
import mapUserData, { UserData } from "./mapUserData";

initFirebase()

const useUser = () => {
  const [user, setUser] = useState<UserData | undefined>()
  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push('/')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const userData = await mapUserData(user)
          setUserCookie(userData)
          setUser(userData)
        } else {
          removeUserCookie()
          setUser(undefined)
        }
      })

    const userFromCookie = getUserFromCookie()
    if (!userFromCookie) {
      router.push('/auth').then()
      return
    }
    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
  }, [])

  return { user, logout }
}

export { useUser }
