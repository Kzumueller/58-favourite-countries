"use client"

import {useCallback} from "react";
import {createUser} from "@/src/actions/db/user/createUser";
import {UserForm} from "@/src/components/user/UserForm";

/** user UserForm to sign in a user */
export const SignIn = () => {

  const login = useCallback(async (username: string, password: string) => {
    /// log in the user
  }, []);

  return <UserForm onSubmit={login} showAvailability={false} />
}