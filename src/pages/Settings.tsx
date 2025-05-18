import { useAppSelector } from "../hooks/reduxHooks";
import { useState } from "react";

const Settings = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, darkMode });
  };

  return (
    <>
      <h1
        className={`text-3xl font-bold mb-6 ${
          darkMode ? "text-white" : "text-gray-800 dark"
        }`}
      >
        ⚙️ Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 space-y-5 transition-all duration-300"
      >
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          💾 Save Settings
        </button>
      </form>
    </>
  );
};

export default Settings;
