export const getAirports = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  });

  let url = `${import.meta.env.VITE_API_URL}/api/v1/airports?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result) {
    throw new Error(result?.message);
  }
  return result?.data;
};

