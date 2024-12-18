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

  // get data
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

  // get data
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

  // get data
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

  // get data
  const result = await response.json();
  return result?.data;
};

export const createBooking = async (request) => {
  console.log("ini consoleloge service coyy", request);
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
  console.log(response);
 if (result.meta?.statusCode === 401) {
   throw new Error(result.error?.message || "Token expired, please relogin.");
 }

 if (result.meta?.statusCode === 201) {
   console.log(result.meta?.message || "Booking Created.");

   const bookingId = result.data?.bookingId;
   console.log("Booking ID dari service:", bookingId); 

   if (bookingId) {
     localStorage.setItem("bookingId", bookingId);
     console.log("Booking ID disimpan di localStorage:", bookingId); 
   }

   return result.data;
 }

  return result?.data;
};
