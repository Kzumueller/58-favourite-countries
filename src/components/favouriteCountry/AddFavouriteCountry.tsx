"use client"

import {ReactNode, useCallback, useContext, useMemo, useState} from "react";
import {FavouriteCountryContext} from "@/src/components/favouriteCountry/FavouriteCountryContextProvider";
import {Card} from "@/src/components/layout/Card";
import {Country} from ".prisma/client";
import {Dropdown} from "@/src/components/input/Dropdown";
import {CountryLabel} from "@/src/components/favouriteCountry/display/CountryLabel";
import {addFavouriteCountry} from "@/src/actions/db/favouriteCountry/addFavouriteCountry";
import {Spinner} from "@/src/components/misc/Spinner";
import {CountryDataPoint} from "@/src/components/favouriteCountry/display/CountryDataPoint";
import {TextArea} from "@/src/components/input/TextArea";
import {AuthContext} from "@/src/components/AuthContextProvider";

/** Form to add a new favourite country with notes */
export const AddFavouriteCountry = () => {
  const {user} = useContext(AuthContext);
  const {countries, favouriteCountries, setFavouriteCountries} = useContext(FavouriteCountryContext);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [notes, setNotes] = useState<string>("");

  const [saving, setSaving] = useState<boolean>(false);

  /**
   * saves the currently selected country with the current notes
   * updates local favourite countries, unsets selections
   * @param selectedCountry
   * @param notes
   */
  const saveFavouriteCountry = useCallback(async (selectedCountry: Country, notes: string) => {
    setSaving(true);
    const favouriteCountry = await addFavouriteCountry(user!.id, selectedCountry!.id, notes)

    setFavouriteCountries([favouriteCountry, ...favouriteCountries])
    setSelectedCountry(null);
    setNotes("");
    setSaving(false);
  }, [favouriteCountries, setFavouriteCountries, user])

  /** selectable country options, removes those already favoured, sorts by name desc, maps for use with Dropdown component */
  const options: { key: string, label: ReactNode, value: Country }[] = useMemo(() => countries
  .filter(country =>
    !favouriteCountries.some(fave => fave.country_id === country.id)
  )
  .sort((left, right) => left.name < right.name ? -1 : 1)
  .map(country => ({
      key: country.id.toString(),
      label: <CountryLabel flag={country.flag} name={country.name} />,
      value: country,
    })
  ), [countries, favouriteCountries]);

  return <Card
    title={"Add a favourite country"}
    footer={<button
      className="btn btn-primary btn-sm"
      disabled={!selectedCountry || saving}
      onClick={() => saveFavouriteCountry(selectedCountry!, notes)}>
      {saving && <Spinner />}
      Add to Favourites
  </button>}
  >
    <Dropdown
      onSelect={setSelectedCountry}
      options={[
        {key: "-1", label: "None", value: null},
        ...options
      ]}
    >
      {selectedCountry
        ? <CountryLabel flag={selectedCountry.flag} name={selectedCountry.name} />
        : <div>Select Country</div>}
    </Dropdown>

    {selectedCountry && <>
      <div className="flex justify-between">
        <CountryDataPoint property="Capital" value={selectedCountry.capital} />
        <CountryDataPoint property="Population" value={selectedCountry.population} />
      </div>

      <TextArea
        text={notes}
        onChange={setNotes}
        placeholder={"Notes ..."}
        onPressEnter={() => saveFavouriteCountry(selectedCountry!, notes)}
      />
    </>}
  </Card>
}