export const getAirports = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  });

  let url = `${import.meta.env.VITE_API_URL}/airports?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  // get data
  const result = await response.json();
  if (!result) {
    throw new Error(result?.message);
  }
  return result?.data;
};

// Daftar Params untuk data Airports
//   page,
//   limit,
// Contoh Cara pemanggilan : 
// const airports = await getAirports({
//   page: 1,
//   limit: 10,
//})
