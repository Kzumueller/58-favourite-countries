"use client"

import {useContext} from "react";
import {FavouriteCountryContext} from "@/src/components/favouriteCountry/FavouriteCountryContextProvider";
import {AddFavouriteCountry} from "@/src/components/favouriteCountry/AddFavouriteCountry";

export const FavouriteCountry = () => {


  return <>
    <AddFavouriteCountry />
  </>
}