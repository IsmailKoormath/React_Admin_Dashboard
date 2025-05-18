import type { ReactNode } from "react";

interface CardProps {
  label: string;
  value: number;
  icon?: ReactNode;
}

const Card = ({ label, value, icon }: CardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 hover:shadow-lg transition duration-300 flex justify-between items-center">
    <div>
      <h3 className="text-sm text-gray-500 dark:text-gray-400">{label}</h3>
      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
        {value}
      </p>
    </div>
    <div className="text-indigo-500 dark:text-indigo-400 w-8 h-8">{icon}</div>
  </div>
);

export default Card;
