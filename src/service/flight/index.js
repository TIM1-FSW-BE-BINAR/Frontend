export const getIdFlight = async (flightID) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/flights/${flightID}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  // get data
  const result = await response.json();
  console.log(result);
  return result?.data;
};
