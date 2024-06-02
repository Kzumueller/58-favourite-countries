import { FavouriteCountry } from "../components/favouriteCountry/FavouriteCountry";
import { FavouriteCountryContextProvider } from "../components/favouriteCountry/FavouriteCountryContextProvider";
import {FavouriteCountrySubscriber} from "@/src/components/favouriteCountry/FavouriteCountrySubscriber";
import {AuthSubscriber} from "@/src/components/AuthSubscriber";

/** Index page & protected route, contains all things CRUD for favourite countries */
export default function FavouriteCountryPage() {

  return <div className="flex justify-center w-full h-screen p-6">
    <FavouriteCountryContextProvider>
      <AuthSubscriber />
      <FavouriteCountrySubscriber />

      <FavouriteCountry />
    </FavouriteCountryContextProvider>
  </div>
}
