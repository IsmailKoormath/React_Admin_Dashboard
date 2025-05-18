interface CardProps {
  label: string;
  value: number;
}

const Card = ({ label, value }: CardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 hover:shadow-lg transition duration-300">
    <h3 className="text-sm text-gray-500 dark:text-gray-400">{label}</h3>
    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
      {value}
    </p>
  </div>
);

export default Card;
