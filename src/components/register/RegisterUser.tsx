"use client"

import {useCallback, useContext} from "react";
import {createUser} from "@/src/actions/db/user/createUser";
import {UserForm} from "@/src/components/user/UserForm";
import Link from "next/link";
import {signInUser} from "@/src/actions/db/user/signInUser";
import {useRouter} from "next/navigation";
import {AuthContext} from "@/src/components/AuthContextProvider";
import {getCurrentUser} from "@/src/actions/db/user/getCurrentUser";

/** user UserForm to register a new user */
export const RegisterUser = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const saveUser = useCallback(async (username: string, password: string) => {
    await createUser({ username, password });

    const token = await signInUser(username, password);
    document.cookie = `token=${token}`;

    const user = await getCurrentUser();
    setUser(user!);

    router.push("/");
  }, [router, setUser])

  return <div className="flex flex-col justify-center items-center w-full h-screen">
    <UserForm title="Create an account" onSubmit={saveUser} showAvailability/>
    <div className="mt-4">
      {"Already have an account?"} <Link className="link link-accent" href="/login">Sign In</Link>
    </div>
  </div>
}