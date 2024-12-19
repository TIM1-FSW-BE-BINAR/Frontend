export const getFlights = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  });

  let url = `${import.meta.env.VITE_API_URL}/api/v1/flights?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  // get data
  const result = await response.json();
  if (!result) {
    throw new Error(result?.error?.message);
  }
  return result?.data;
};

export const getFlightId = async (id) => {
  let url = `${import.meta.env.VITE_API_URL}/api/v1/flights/${id}`;

  const response = await fetch(url, {
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

