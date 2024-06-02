"use client"

import {useCallback, useContext, useEffect} from "react";
import {FavouriteCountryContext} from "@/src/components/favouriteCountry/FavouriteCountryContextProvider";
import {getCountries} from "@/src/actions/db/country/getCountries";
import {getFavouriteCountries} from "@/src/actions/db/favouriteCountry/getFavouriteCountries";
import {AuthContext} from "@/src/components/AuthContextProvider";

export const FavouriteCountrySubscriber = () => {
  const { user } = useContext(AuthContext);
  const { setCountries, setFavouriteCountries } = useContext(FavouriteCountryContext);

  /** fetches the list of countries and the current user's favourites and makes them available via context */
  const fetchData = useCallback(async () => {
      const countries = await getCountries();
      setCountries(countries)

      const favouriteCountries = await getFavouriteCountries(user?.id ?? "");
      setFavouriteCountries(favouriteCountries);
  }, [setCountries, setFavouriteCountries, user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <></>
}