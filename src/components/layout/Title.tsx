import {ReactNode} from "react";

type Props = {
  children?: ReactNode;
}

export const Title = ({children}: Props) => {
  return <h2 className={"m-6 text-3xl font-bold text-center text-gray-700"}>{children}</h2>
}