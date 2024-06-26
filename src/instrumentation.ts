/** Next middleware running on start-up - fetches country data via GQL if not yet available */
export const register = async () => {
  if(process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    const { fetchCountries } = await import("@/src/actions/gql/fetch-countries");

    await fetchCountries();
  } catch(error) {
    console.error(error)
  }
}