import cookies from 'js-cookie'
import { UserData } from "./mapUserData";

export function getUserFromCookie(): UserData | void {
  const cookie = cookies.get('auth')
  if (!cookie) return
  return JSON.parse(cookie)
}

export function setUserCookie(user: UserData): void {
  cookies.set('auth', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  })
}

export const removeUserCookie = () => cookies.remove('auth')
