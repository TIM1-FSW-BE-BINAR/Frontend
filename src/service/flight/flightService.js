export const getFlights = async (filters = {}) => {
  const params = new URLSearchParams();
    
   Object.entries(filters).forEach(([key, value]) => {
     if (value !== undefined && value !== null) {
       params.append(key, value);
     }
   });

  let url = `${import.meta.env.VITE_API_URL}/flights?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });


  // get data
  const result = await response.json();
  if (!result) {
    throw new Error(result?.message);
  }
  return result?.data;
};

// Daftar Params untuk data flights
//   page,
//   limit,
//   seatClass,
//   isCheapest,
//   flightNumber,
//   priceMin,
//   priceMax,
//   earliestDeparture,
//   latestDeparture,
//   earliestArrival,
//   latestArrival,
//   shortest,
//   arrivalAirport,
//   departureAirport,
//   departureDate;
// Contoh Cara pemanggilan : 
// const flights = await getFlights({
//   page: 1,
//   limit: 10,
//   seatClass: "economy",
//   isCheapest: true,
//   flightNumber: "12345",
//   priceMin: 500000,
//   priceMax: 1000000,
//   earliestDeparture: "2024-12-01",
//   latestDeparture: "2024-12-10",
//   arrivalAirport: "JFK",
//   departureAirport: "LAX",
//   departureDate: "2024-12-01",
// });
