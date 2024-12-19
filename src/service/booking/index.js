export const getAllBookings = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/booking`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  console.log("booking:", result);
  return result?.data;
};

export const getIdBooking = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/booking/id/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  return result?.data;
};

export const getCodeBooking = async (code) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/booking/code/${code}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  return result?.data;
};

export const getGroupBooking = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/booking/group/`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  return result?.data;
};

export const createBooking = async (request) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/booking`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(request),
    }
  );

  const result = await response.json();
  if (result.meta?.statusCode === 401) {
    throw new Error(result.error?.message || "Token expired, please relogin.");
  }

  if (result.meta?.statusCode === 201) {
    const bookingId = result.data?.bookingId;

    if (bookingId) {
      localStorage.setItem("bookingId", bookingId);
    }

    return result.data;
  }

  return result?.data;
};
