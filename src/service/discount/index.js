export const getAllDiscounts = async () => {
  const token = localStorage.getItem("token"); 
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/discount`, 
    {
      headers: {
        authorization: `Bearer ${token}`, 
      },
      method: "GET",
    }
  );

  const result = await response.json();
  console.log(result);
  if (!response.ok) {
    throw new Error(result?.message || "Failed to fetch discounts");
  }

  return result?.data; 
};
