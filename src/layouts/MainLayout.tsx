import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/reduxHooks";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 w-full max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
