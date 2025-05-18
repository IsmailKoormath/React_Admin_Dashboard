import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../store/slices/authSlice";
import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { toggleDarkMode } from "../store/slices/themeSlice";

const Header = () => {
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

  return (
    <header className={`bg-white dark:bg-gray-900 shadow p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700`}>
      <div className="flex items-center gap-4">
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
