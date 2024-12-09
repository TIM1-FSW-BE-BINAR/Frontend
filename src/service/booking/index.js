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
  console.log(result);
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
  console.log(result);
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
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/booking`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: request,
    }
  );

  // get data
  const result = await response.json();
  return result?.data;
};
