export const register = async () => {
  if(process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    const { default: schemas } = await import("@/src/actions/db/schemas");

    await schemas();
  } catch(error) {
    // this throws an inconsequential error pertaining to pg modules not playing nicely but still working in the end
    //console.error(error)
  }

  try {
    const { fetchCountries } = await import("@/src/actions/gql/fetch-countries");

    await fetchCountries();
  } catch(error) {
    console.error(error)
  }
}