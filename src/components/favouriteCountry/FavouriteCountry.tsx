"use client"

import {AddFavouriteCountry} from "@/src/components/favouriteCountry/AddFavouriteCountry";
import {FavouriteCountryList} from "@/src/components/favouriteCountry/display/FavouriteCountryList";
import {Title} from "@/src/components/layout/Title";

/** Layout component for all things favourite country management */
export const FavouriteCountry = () => {
  return <div className="flex flex-col items-center gap-y-4">
      <Title>Manage your Favourite Countries</Title>

      <AddFavouriteCountry />

      <FavouriteCountryList />
    </div>
}