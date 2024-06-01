"use client"

import {useCallback, useState} from "react";
import {UserForm} from "@/src/components/user/UserForm";
import {signInUser} from "@/src/actions/db/user/signInUser";
import {Alert} from "@/src/components/misc/Alert";
import {useRouter} from "next/navigation";
import Link from "next/link";

/** user UserForm to sign in a user */
export const SignIn = () => {
  const router = useRouter();
  const [signInFailed, setSignInFailed] = useState<boolean>(false);

  /**
   * logs in the user
   * sets its token as a cookie and redirects to / on success
   * shows an alert on failure
   */
  const login = useCallback(async (username: string, password: string) => {
    setSignInFailed(false);

    const token = await signInUser(username, password);

    if(token === null) {
      setSignInFailed(true);
      setTimeout(() => setSignInFailed(false), 2500);
    } else {
      document.cookie = `token=${token}`;
      router.push("/");
    }
  }, [router]);

  return <div className="flex flex-col justify-center items-center w-full h-screen">
    {signInFailed && <Alert message={"Login Failed!"}/>}
    <UserForm title="Sign in" onSubmit={login} showAvailability={false}/>
    <div className="mt-4">
      {"Don't have an account?"} <Link className="link link-accent" href="/register">Register</Link>
    </div>
  </div>
}