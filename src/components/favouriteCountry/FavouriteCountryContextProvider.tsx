"use client"

import {User, Country, FavouriteCountry} from ".prisma/client";
import {createContext, ReactNode, useState} from "react";

type FavouriteCountryState = {
  user: User | null,
  setUser: (user: User) => void,
  countries: Country[],
  setCountries: (countries: Country[]) => void,
  favouriteCountries: FavouriteCountry[],
  setFavouriteCountries: (countries: FavouriteCountry[]) => void
}

export const FavouriteCountryContext = createContext<FavouriteCountryState>({
  user: null,
  setUser: () => {},
  countries: [],
  setCountries: () => {},
  favouriteCountries: [],
  setFavouriteCountries: () => {}
});

export const FavouriteCountryContextProvider = ({ children }: { children : ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [favouriteCountries, setFavouriteCountries] = useState<FavouriteCountry[]>([]);

  return <FavouriteCountryContext.Provider value={{
    user,
    setUser,
    countries,
    setCountries,
    favouriteCountries,
    setFavouriteCountries
  }}>
    {children}
  </FavouriteCountryContext.Provider>
};