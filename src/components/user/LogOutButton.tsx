"use client"

import {useCallback} from "react";
import {useRouter} from "next/navigation";

/** Fixed button to log out the current user */
export const LogOutButton = () => {
  const router = useRouter();

  /**
   * unsets the current token cookie, thereby rendering the front-end incapable of authorizing requests
   * redirects to /login afterwards
   */
  const signOut = useCallback(() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.push("/login");
  }, [router]);

  return <button title="Sign Out" className="btn btn-ghost fixed top-3 right-3" onClick={signOut}>❌</button>
}