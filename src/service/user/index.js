export const updateUser = async (request) => {
  const token = localStorage.getItem("token");

  const payload = {
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    phone: request.phone,
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/users/profile`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify(payload),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal memperbarui data!");
  }
  return result?.data;
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/api/v1/users/profile`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  return result?.data;
};
