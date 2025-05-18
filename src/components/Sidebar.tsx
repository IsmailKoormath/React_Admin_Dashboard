import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { Cog6ToothIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/solid";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  { name: "Users", path: "/users", icon: <UsersIcon className="w-5 h-5" /> },
  {
    name: "Settings",
    path: "/settings",
    icon: <Cog6ToothIcon className="w-5 h-5" />,
  },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`w-64 ${
          darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-0"
        } p-4 hidden md:block`}
      >
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
          MyAdmin
        </div>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-indigo-100"
              } transition-colors ${
                location.pathname === link.path
                  ? darkMode
                    ? "bg-gray-800"
                    : "bg-indigo-100"
                  : ""
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`absolute inset-0 `}
          onClick={onClose}
        />
        <aside
          className={`relative w-64 h-full ${
            darkMode ? "bg-gray-900" : "bg-white"
          } p-4`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300"
          >
            ✕
          </button>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
            MyAdmin
          </div>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-indigo-100"
                } transition-colors ${
                  location.pathname === link.path
                    ? darkMode
                      ? "bg-gray-800"
                      : "bg-indigo-100"
                    : ""
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
