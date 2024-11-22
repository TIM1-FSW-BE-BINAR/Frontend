export const login = async (request) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    body: JSON.stringify(request),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
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
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("email", request.email);
  formData.append("password", request.password);
  formData.append("profile_picture", request.profilePicture);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      body: formData,
    }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
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
