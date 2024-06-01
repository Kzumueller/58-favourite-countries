import {ReactNode} from "react";

type Props = {
  children?: ReactNode;
}

export const Label = ({ children }: Props) => {
  return <div className="flex flex-row w-full italic text-xs mt-1">{children}</div>
}