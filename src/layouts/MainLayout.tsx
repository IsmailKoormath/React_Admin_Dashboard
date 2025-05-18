import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { useState } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onSidebarToggle={() => setIsSidebarOpen(true)} />
        <main className="p-6 w-full max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
