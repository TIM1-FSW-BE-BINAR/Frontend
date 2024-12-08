export const getAirlineById = async (airlineId) => {
  const token = localStorage.getItem("token");
  //   let params;
  //   if (spec) {
  //     params.spec = spec;
  //   }
  //   let url =
  //     `${import.meta.env.VITE_API_URL}//api/v1/airlines` + new URLSearchParams(params);

  const url = `${import.meta.env.VITE_API_URL}/api/v1/airlines/${airlineId}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Airline not found or error fetching data");
  }
  const result = await response.json();
  return result.data;
};
