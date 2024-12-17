export const getIdPayment = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/payment/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  console.log("payment id:", result);

  if (result?.data?.id) {
    result.data.paymentId = result.data.id;
    delete result.data.id;
  }

  return result?.data;
};

export const cancelPayment = async (orderId, request) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/payment/${orderId}/cancel`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();
  return result;
};
