"use client"

import {useCallback, useContext, useEffect} from "react";
import {AuthContext} from "@/src/components/AuthContextProvider";
import {getCurrentUser} from "@/src/actions/db/user/getCurrentUser";
import {useRouter} from "next/navigation";

export const AuthSubscriber = () => {
  const router = useRouter();
  const { setUser} = useContext(AuthContext);

  /** fetches the current user object, redirects to log-in if unavailable */
  const fetchUser = useCallback(async () => {
    const user = await getCurrentUser();

    if(user) setUser(user);
    else router.push("/login");
  }, [router, setUser])

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <></>;
}