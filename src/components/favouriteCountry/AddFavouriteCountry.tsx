"use client"

import {ReactNode, useContext, useMemo, useState} from "react";
import {FavouriteCountryContext} from "@/src/components/favouriteCountry/FavouriteCountryContextProvider";
import {Card} from "@/src/components/layout/Card";
import {Country} from ".prisma/client";
import {Dropdown} from "@/src/components/input/Dropdown";
import {CountryLabel} from "@/src/components/favouriteCountry/CountryLabel";
import {Label} from "@/src/components/layout/Label";

const numberFormatter = new Intl.NumberFormat(window?.navigator?.language)

export const AddFavouriteCountry = () => {
  const {countries, favouriteCountries, setFavouriteCountries} = useContext(FavouriteCountryContext);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [notes, setNotes] = useState<string>("");

  const options: { key: string, label: ReactNode, value: Country }[] = useMemo(() => countries
  .filter(country =>
    !favouriteCountries.some(fave => fave.country_id === country.id)
  ).map(country => ({
      key: country.id.toString(),
      label: <CountryLabel country={country} />,
      value: country,
    })
  ), [countries, favouriteCountries]);

  return <Card title={"Add a favourite country"}>
    <Dropdown
      value={selectedCountry}
      onSelect={setSelectedCountry}
      options={options}
    >
      {selectedCountry
        ? <CountryLabel country={selectedCountry} />
        : <div>Select Country</div>}
    </Dropdown>

    {selectedCountry && <>
      <div className="flex justify-between">
        <div className="flex flex-col pt-4 gap-2">
          <Label>
            Capital:
          </Label>
          <div>
            {selectedCountry.capital}
          </div>
        </div>

        <div className="flex flex-col pt-4 gap-2">
          <Label>
            Population:
          </Label>
          <div>
            {numberFormatter.format(Number(selectedCountry.population))}
          </div>
        </div>
      </div>

      <textarea
        className="textarea textarea-bordered w-full mt-4"
        placeholder="Notes ..."
        maxLength={1024}
        value={notes}
        onChange={({ target: { value } }) => setNotes(value)}
      />

      <div className="flex justify-end mt-4">
        <button className="btn btn-primary">Add to Favourites</button>
      </div>
    </>}
  </Card>
}