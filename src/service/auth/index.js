import { ClimbingBoxLoader } from "react-spinners";

export const login = async (request) => {
  // try {
  //   const raw = JSON.stringify({
  //     email: request.email,
  //     password: request.password,
  //   });

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   const response = await fetch(
  //     "https://binar.azumidev.web.id/api/v1/auth/login",
  //     requestOptions
  //   );

  //   if (!response.ok) {
  //     // Handle non-200 status codes
  //     const errorBody = await response.text();
  //     throw new Error(
  //       `HTTP error! status: ${response.status}, message: ${errorBody}`
  //     );
  //   }
  //   const data = await response.json(); // Parse JSON response
  //   return data;
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   throw error; // Re-throw to allow caller to handle
  // }

  //export const login = async (request) => {
  console.log(request);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      {
        body: JSON.stringify(request),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorBody}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }


};

export const googleLogin = async (accessToken) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/google/login`,
    {
      body: JSON.stringify({ access_token: accessToken }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const register = async (request) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        password: request.password,
        phone: request.phone,
      }),
    }
  );

  const result = await response.json();
  return result;
};

export const profile = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result?.data;
};

export const sendEmail = async (request) => {
  
  console.log(request);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/reset-otp`,
      {
        body: JSON.stringify(request),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // if (!response.ok) {
    //   const errorBody = await response.text();
    //   throw new Error(
    //     `HTTP error! status: ${response.status}, message: ${errorBody}`
    //   );
    // }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }


};