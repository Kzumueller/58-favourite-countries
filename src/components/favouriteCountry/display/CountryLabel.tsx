import {Country} from "@prisma/client";
import {Flag} from "@/src/components/favouriteCountry/display/Flag";

type Props = {
  name: string;
  flag: string;
}

export const CountryLabel = ({name, flag}: Props) => <div
  className="inline-flex gap-x-2 w-full"
>
  <Flag filename={flag} />
  {name}
</div>