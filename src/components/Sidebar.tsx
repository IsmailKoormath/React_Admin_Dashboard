import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector } from "../hooks/reduxHooks";


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

const Sidebar = () => {
  const location = useLocation();
    const darkMode = useAppSelector((state) => state.theme.darkMode);


  return (
    <aside
      className={`w-64 ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-r"
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
                ? "bg-indigo-100 dark:bg-gray-800"
                : ""
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
