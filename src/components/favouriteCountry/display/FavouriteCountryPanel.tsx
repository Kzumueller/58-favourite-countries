"use client";

import {Country, FavouriteCountry} from ".prisma/client";
import {Card} from "@/src/components/layout/Card";
import {CountryLabel} from "@/src/components/favouriteCountry/display/CountryLabel";
import {CountryDataPoint} from "@/src/components/favouriteCountry/display/CountryDataPoint";
import {useCallback, useContext, useMemo, useState} from "react";
import {TextArea} from "@/src/components/input/TextArea";
import {updateFavouriteCountry} from "@/src/actions/db/favouriteCountry/updateFavouriteCountry";
import {FavouriteCountryContext} from "@/src/components/favouriteCountry/FavouriteCountryContextProvider";
import {deleteFavouriteCountry} from "@/src/actions/db/favouriteCountry/deleteFavouriteCountry";

/** Favourite country data merged with country meta-data */
export type CountryData = Required<FavouriteCountry> & Pick<Country, "flag" | "name" | "capital" | "population">

type Props = {
  country: CountryData;
}

/**
 * displays all relevant information for a single favourite country,
 * with options to update notes or remove the country from the list (unfavour, so to speak)
 */
export const FavouriteCountryPanel = ({ country }: Props) => {
  const { favouriteCountries, setFavouriteCountries } = useContext(FavouriteCountryContext);
  const [notes, setNotes] = useState<string>(country.notes);

  /** makes the current country fall out of favour */
  const removeCountry = useCallback(async () => {
    await deleteFavouriteCountry(country.id);

    setFavouriteCountries(favouriteCountries.filter(entry => entry.id !== country.id));
  }, [country.id, favouriteCountries, setFavouriteCountries]);

  /**
   * updates notes about the current country
   * @param notes
   */
  const saveNotes = useCallback(async (notes: string) => {
    const updated = await updateFavouriteCountry(country.id, { notes })

    const index = favouriteCountries.findIndex(country => country.id === updated.id)

    setFavouriteCountries(favouriteCountries.toSpliced(index, 1, updated))
  }, [country, favouriteCountries, setFavouriteCountries]);

  return <Card
    title={<CountryLabel flag={country.flag} name={country.name} />}
    footer={<>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => saveNotes(notes)}
        disabled={notes === country.notes}
      >
        Update Notes
      </button>
      <button className="btn btn-error btn-sm" onClick={removeCountry}>Remove</button>
    </>}
  >
    <div className="flex justify-between">
      <CountryDataPoint property="Capital" value={country.capital}/>
      <CountryDataPoint property="Population" value={country.population}/>
    </div>
    <div className="flex justify-between">
      <TextArea text={notes} onChange={setNotes} placeholder={"Notes ..."} />
    </div>
  </Card>
}