import {Country} from "@prisma/client";
import {Flag} from "@/src/components/favouriteCountry/display/Flag";

type Props = {
  name: string;
  flag: string;
}

/** displays a country's flag and name in a row */
export const CountryLabel = ({name, flag}: Props) => <div
  className="inline-flex items-center gap-x-2 w-full"
>
  <Flag filename={flag} />
  {name}
</div>