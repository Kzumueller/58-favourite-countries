/**
 * takes a filename in the form of `<alpha-3-code>.svg`, e.g. "irl.svg",
 * and fetches a flag image from the static route used by the GQL countries API
 */
export const Flag = ({ filename }: {filename: string}) => {

  return <img
    className={"max-w-5 w-5 max-h-5"}
    src={`https://storage.googleapis.com/graphql-country.appspot.com/flags/${filename}`}
    alt="flag"
  />
}