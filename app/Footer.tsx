"use client";

import Link from "next/link";
import { createSessionCookie, removeSessionCookie, validateUser } from "../actions/auth-actions";
import { useUserSession } from "../hooks/use-user-session";
import { signInWithGoogle, signOutWithGoogle } from "../libs/firebase/auth";
import { toast } from "react-toastify";

export function Footer({ session }: { session: string | null }) {
  const userSessionId = useUserSession(session);

  const handleSignIn = async () => {
    const {email, token} = await signInWithGoogle();
    
    if (email && await validateUser(email)) {
      await createSessionCookie(token);
    } else {
      toast.error("Unauthorized");
      await signOutWithGoogle();
    }
  };

  const handleSignOut = async () => {
   await signOutWithGoogle();
   await removeSessionCookie();
 };
  
  return (
    <>
      <footer
        className={
          "bg-black text-white flex justify-end px-2 py-1 space-x-3 w-full"
        }
      >
        {!userSessionId ? (
          <button onClick={handleSignIn}>Sign In</button>
        ) : (
          <>
          <Link href={"/admin"}>{"Admin"}</Link>
          <button onClick={handleSignOut}>Sign Out</button>
          </>
          )}

        <a href={"https://jugend.ebu.de/impressum-datenschutz"}>
          {"Impressum"}
        </a>
      </footer>
    </>
  );
}

export default Footer;
