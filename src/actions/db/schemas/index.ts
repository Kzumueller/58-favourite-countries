"use server"

import users from "@/src/actions/db/schemas/users";
import countries from "@/src/actions/db/schemas/countries";
import favouriteCountry from "@/src/actions/db/schemas/favouriteCountry";

export default async () => {
  await users();
  await countries();
  await favouriteCountry();
}