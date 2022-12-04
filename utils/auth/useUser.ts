import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUserFromCookie, removeUserCookie, setUserCookie, } from './userCookies'
import mapUserData, { UserData } from "./mapUserData";
import { getAuth } from 'firebase/auth'
import initFirebase from './initFirebase';
initFirebase()

const useUser = () => {
  const [user, setUser] = useState<UserData | undefined>()
  const router = useRouter()

  const logout = async () => {
    return getAuth()
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
    const cancelAuthListener = getAuth()
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
