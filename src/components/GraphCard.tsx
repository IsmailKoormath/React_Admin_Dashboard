import type { ReactNode } from "react";

interface GraphCardProps {
  title: string;
  children: ReactNode;
}

const GraphCard = ({ title, children }: GraphCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      {title}
    </h2>
    {children}
  </div>
);

export default GraphCard;
