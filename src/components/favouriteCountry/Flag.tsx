import Image from "next/image";

export const Flag = ({ filename }: {filename: string}) => {

  return <img
    className={"w-5 h-5"}
    src={`https://storage.googleapis.com/graphql-country.appspot.com/flags/${filename}`}
    alt="flag"
  />
}