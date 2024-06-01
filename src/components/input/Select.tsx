"use client"

import {ReactNode} from "react";

type Props = {
  value: string;
  onSelect: (value: string) => void;
  options: { label: ReactNode; value: string }[];
};

export const Select = ({ value, onSelect, options }: Props) => {

  return <select
    className="select select-primary w-full max-w-xs"
    value={value}
    onChange={({ target: { value } }) => onSelect(value)}
  >
    {options.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
  </select>
}