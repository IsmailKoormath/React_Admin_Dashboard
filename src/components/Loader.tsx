import { useAppSelector } from "../hooks/reduxHooks";

const Loader = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
