"use client"

import {User, Country, FavouriteCountry} from ".prisma/client";
import {createContext, ReactNode, useState} from "react";

type FavouriteCountryState = {
  countries: Country[],
  setCountries: (countries: Country[]) => void,
  favouriteCountries: FavouriteCountry[],
  setFavouriteCountries: (countries: FavouriteCountry[]) => void
}

export const FavouriteCountryContext = createContext<FavouriteCountryState>({
  countries: [],
  setCountries: () => {},
  favouriteCountries: [],
  setFavouriteCountries: () => {}
});

export const FavouriteCountryContextProvider = ({ children }: { children : ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [favouriteCountries, setFavouriteCountries] = useState<FavouriteCountry[]>([]);

  return <FavouriteCountryContext.Provider value={{
    countries,
    setCountries,
    favouriteCountries,
    setFavouriteCountries
  }}>
    {children}
  </FavouriteCountryContext.Provider>
};