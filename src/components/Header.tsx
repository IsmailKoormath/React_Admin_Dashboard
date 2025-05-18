import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logout } from "../store/slices/authSlice";
import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { toggleDarkMode } from "../store/slices/themeSlice";

const Header = ({ onSidebarToggle }: { onSidebarToggle: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [enabled]);



  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleTheme = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    dispatch(toggleDarkMode());
    localStorage.setItem("theme", newValue ? "dark" : "light");
  };
    const darkMode = useAppSelector((state) => state.theme.darkMode);


  return (
    <header
      className={` ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      } shadow p-4 flex items-center justify-between border-b `}
    >
      <button
        onClick={onSidebarToggle}
        className="md:hidden text-gray-700 dark:text-white"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex items-center gap-4 sm:gap-20 ml-auto">
        <div className="flex items-center gap-2">
          <SunIcon className="w-5 h-5 text-yellow-500" />
          <Switch
            checked={enabled}
            onChange={toggleTheme}
            className={`${
              enabled ? "bg-indigo-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
          <MoonIcon className="w-5 h-5 text-indigo-400 dark:text-indigo-300" />
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
