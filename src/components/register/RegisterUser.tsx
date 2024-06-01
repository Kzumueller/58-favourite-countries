"use client"

import {useCallback} from "react";
import {createUser} from "@/src/actions/db/user/createUser";
import {UserForm} from "@/src/components/user/UserForm";

/** user UserForm to register a new user */
export const RegisterUser = () => {

  const saveUser = useCallback(async (username: string, password: string) => {
    await createUser({ username, password });

    /// log in the user
  }, [])

  return <UserForm onSubmit={saveUser} showAvailability />
}