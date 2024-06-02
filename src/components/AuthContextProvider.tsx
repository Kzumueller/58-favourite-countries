"use client"

import {User} from ".prisma/client";
import {createContext, ReactNode, useState} from "react";

type AuthState = {
  user: User | null,
  setUser: (user: User) => void
}

/** context holding the current user, only useful on protected routes */
export const AuthContext = createContext<AuthState>({
  user: null,
  setUser: () => {}
});

export const AuthContextProvider = ({ children }: { children : ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return <AuthContext.Provider value={{
    user,
    setUser
  }}>
    {children}
  </AuthContext.Provider>
};