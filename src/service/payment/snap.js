export const createSnap = async (request) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/payment`,
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
  return result;
};

// export const getSnapById = async (id) => {
//   const token = localStorage.getItem("token");

//   let url = `${import.meta.env.VITE_API_URL}/api/v1/payment${id}`;

//   const response = await fetch(url, {
//     headers: {
//       authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     method: "GET",
//   });

//   const result = await response.json();
//   console.log("get snap", result);
//   return result;
// };
