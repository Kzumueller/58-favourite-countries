import {ReactNode, useMemo} from "react";
import {Label} from "@/src/components/layout/Label";

type Props = {
  property: string;
  value: ReactNode | number;
}

/** displays a single key-value pair of data as a column */
export const CountryDataPoint = ({property, value}: Props) => {
  const numberFormatter = useMemo(() => new Intl.NumberFormat(
    typeof window !== "undefined"
      ? window?.navigator?.language
      : "en-us"
  ), []);

  return <div className="flex flex-col pt-4 gap-2">
    <Label>
      {property}:
    </Label>
    <div>
      {typeof value === "number" ? numberFormatter.format(value) : value}
    </div>
  </div>
}