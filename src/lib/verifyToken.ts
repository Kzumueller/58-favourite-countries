"use server"

import {jwtVerify} from "jose";

export const verifyToken = async<T> (token: string) => {
  const secret = Uint8Array.from(process.env.JWT_SECRET!.split("").map(x => x.charCodeAt(0)));
  return (await jwtVerify(token, secret)).payload as T;
}

