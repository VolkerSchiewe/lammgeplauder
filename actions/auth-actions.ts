
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from '../constants';
import getUsers from '../libs/db/users';

export async function validateUser(email: string): Promise<boolean> {
  return (await getUsers()).includes(email)
}

export async function createSessionCookie(token: string) {
  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // One day
    path: '/',
  });

  redirect(ADMIN_ROUTE);
}

export async function removeSessionCookie() {
  (await cookies()).delete(SESSION_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}