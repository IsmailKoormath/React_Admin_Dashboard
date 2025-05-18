import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useAppSelector } from "../hooks/reduxHooks";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");

  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      company: { name: company },
    };
    setUsers((prev) => [newUser, ...prev]);
    setName("");
    setEmail("");
    setCompany("");
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1
        className={`text-3xl font-bold mb-6 ${
          darkMode ? "text-white " : "text-gray-800"
        }  `}
      >
        👥 User Management
      </h1>

      <input
        type="text"
        placeholder="🔍 Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> */}
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          if (name.trim() && email.trim() && company.trim()) {
            handleAddUser();
          }
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Company Name"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="col-span-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          ➕ Add User
        </button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((u) => (
            <div
              key={u.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {u.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                📧 {u.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🏢 {u.company.name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No users found.</p>
        )}
      </div>
    </>
  );
};

export default Users;
