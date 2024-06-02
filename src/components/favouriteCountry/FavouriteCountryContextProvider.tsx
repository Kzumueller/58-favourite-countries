"use client"

import {User, Country, FavouriteCountry} from ".prisma/client";
import {createContext, ReactNode, useState} from "react";

type FavouriteCountryState = {
  countries: Country[];
  setCountries: (countries: Country[]) => void;
  favouriteCountries: FavouriteCountry[];
  setFavouriteCountries: (countries: FavouriteCountry[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

/** context for inter-component communication related to country data */
export const FavouriteCountryContext = createContext<FavouriteCountryState>({
  loading: true,
  setLoading: () => {},
  countries: [],
  setCountries: () => {},
  favouriteCountries: [],
  setFavouriteCountries: () => {}
});

export const FavouriteCountryContextProvider = ({ children }: { children : ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [favouriteCountries, setFavouriteCountries] = useState<FavouriteCountry[]>([]);
  const [loading, setLoading] = useState(true);

  return <FavouriteCountryContext.Provider value={{
    countries,
    setCountries,
    favouriteCountries,
    setFavouriteCountries,
    loading,
    setLoading
  }}>
    {children}
  </FavouriteCountryContext.Provider>
};