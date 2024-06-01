import {ReactNode, useRef, useState} from "react";

type Props = {
  children: ReactNode;
  value: any;
  onSelect: (value: any) => void;
  options: { key: string, label: ReactNode; value: any }[];
};

export const Dropdown = ({ children, value, options, onSelect }: Props) => {
  const summaryRef = useRef<HTMLElement>(null);

  return <details className="dropdown w-full">
    <summary ref={summaryRef} className="m-1 cursor-pointer btn w-full">{children}</summary>
    <ul className="flex flex-col flex-nowrap p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 max-h-96 overflow-scroll">
      {options
      .map((option) =>
        <li key={option.key}><a onClick={() => {
          onSelect(option.value);
          summaryRef.current?.click();
        }}>{option.label}</a></li>
      )}
    </ul>
  </details>
}