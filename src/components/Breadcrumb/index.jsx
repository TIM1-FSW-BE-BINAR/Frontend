import { useRouter } from "@tanstack/react-router";

const StepsSection = () => {
  const router = useRouter();
  const currentPath = router.state.currentLocation.pathname;

  return (
    <div className="flex justify-start my-10 pl-5 sm:pl-[280px]">
      <div className="flex items-center space-x-4 text-sm">
        <span
          className={`font-bold text-sm sm:text-xl ${
            currentPath === "/Pemesanan" ? "text-black" : "text-gray-500"
          }`}
        >
          Order Data
        </span>
        <span className="text-gray-500">{">"}</span>
        <span
          className={`font-bold text-sm sm:text-xl ${
            currentPath === "/Bayar" ? "text-black" : "text-gray-500"
          }`}
        >
          Payment
        </span>
        <span className="text-gray-500">{">"}</span>
        <span
          className={`font-bold text-sm sm:text-xl ${
            currentPath === "/payment-success" ? "text-black" : "text-gray-500"
          }`}
        >
          Complete
        </span>
      </div>
    </div>
  );
};

export default StepsSection;
