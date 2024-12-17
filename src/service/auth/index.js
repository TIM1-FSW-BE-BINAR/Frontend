import { ClimbingBoxLoader } from "react-spinners";

export const login = async (request) => {
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

    const result = await response.json();
    if (!result?.meta) {
      throw new Error(result?.error?.message);
    }
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const googleLogin = async (accessToken) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login-google`,
      {
        body: JSON.stringify({ access_token: accessToken }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (!result?.meta) {
      throw new Error(result?.error?.message);
    }
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const register = async (request) => {
  try {
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
    if (!result?.meta) {
      throw new Error(result?.error?.message);
    }
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const verifyEmail = async (request) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/verify`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const resendOtp = async (request) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/reset-otp`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const resetPassword = async (request) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/reset-password`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const profile = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  console.log(result);
  return result?.data;
};


export const profileMe = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  console.log(result);
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
