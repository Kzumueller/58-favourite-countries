"use client"

import {useCallback, useContext, useEffect} from "react";
import {FavouriteCountryContext} from "@/src/components/favouriteCountry/FavouriteCountryContextProvider";
import {getCurrentUser} from "@/src/actions/db/user/getCurrentUser";
import {useRouter} from "next/navigation";
import {getCountries} from "@/src/actions/db/country/getCountries";
import {getFavouriteCountries} from "@/src/actions/db/favouriteCountry/getFavouriteCountries";

export const FavouriteCountrySubscriber = () => {
  const router = useRouter();
  const { setUser, setCountries, setFavouriteCountries } = useContext(FavouriteCountryContext);

  /** fetches the current user, countries, and favourite countries and makes them available via context */
  const fetchData = useCallback(async () => {
      const user = await getCurrentUser();

      if(user) setUser(user);
      else return router.push("/login");

      const countries = await getCountries();
      setCountries(countries)

      const favouriteCountries = await getFavouriteCountries(user.id);
      setFavouriteCountries(favouriteCountries);
  }, [router, setCountries, setFavouriteCountries, setUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <></>
}