export const webhook = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/payment/webhook`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const result = await response.json();
  console.log("webhook", result);
  return result;
};
