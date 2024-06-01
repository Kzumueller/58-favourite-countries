import { FavouriteCountry } from "../components/favouriteCountry/FavouriteCountry";
import { FavouriteCountryContextProvider } from "../components/favouriteCountry/FavouriteCountryContextProvider";
import {FavouriteCountrySubscriber} from "@/src/components/favouriteCountry/FavouriteCountrySubscriber";

export default function FavouriteCountryPage() {

  return <div className="flex justify-center w-full h-screen p-6">
    <FavouriteCountryContextProvider>
      <FavouriteCountrySubscriber />

      <FavouriteCountry />
    </FavouriteCountryContextProvider>
  </div>
}
