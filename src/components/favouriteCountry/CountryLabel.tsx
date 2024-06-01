import {Country} from "@prisma/client";
import {Flag} from "@/src/components/favouriteCountry/Flag";

export const CountryLabel = ({country}: {country: Country}) => <div
  className="inline-flex gap-x-2 w-full"
>
  <Flag filename={country.flag} />
  {country.name}
</div>