export const getAllSeats = async (params = {}) => {
  const token = localStorage.getItem("token");

  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/seats?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`errorrrrr boss: ${response.statusText}`);
  }

  const result = await response.json();
  //console.log("ini di service", result);
  return result;
};
