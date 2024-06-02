import {useContext, useMemo} from "react";
import {FavouriteCountryContext} from "@/src/components/favouriteCountry/FavouriteCountryContextProvider";
import {CountryData, FavouriteCountryPanel} from "@/src/components/favouriteCountry/display/FavouriteCountryPanel";
import {Title} from "@/src/components/layout/Title";
import {Spinner} from "@/src/components/misc/Spinner";

/** Lists all favourite countries */
export const FavouriteCountryList = () => {
  const { favouriteCountries, countries, loading } = useContext(FavouriteCountryContext);

  /**
   * merges favourites with their countries' data
   * explicitly not joined in the back-end for easier cache updates without re-fetching the entire list
   * or other painful activities
   */
  const listedCountries = useMemo(
    () => favouriteCountries
    .map(fave => {
      const { name, flag, capital, population } = countries.find(country => fave.country_id === country.id)!;

      return ({
        ...fave,
        name,
        flag,
        capital,
        population
      } as CountryData);
    }),
    [favouriteCountries, countries]);

  return <div className="flex flex-col">
    {listedCountries.length > 0 && <Title>My Favourites</Title>}
    <div className="flex justify-center flex-wrap gap-x-4 gap-y-4">
      {loading && <Spinner />}
      {listedCountries.map(country => <div key={country.id}>
        <FavouriteCountryPanel country={country}/>
      </div>)}
    </div>
  </div>
}