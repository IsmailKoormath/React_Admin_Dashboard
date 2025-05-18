import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  isLocal?: boolean;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">();

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
      isLocal: true,
    };
    setUsers((prev) => [newUser, ...prev]);
    setName("");
    setEmail("");
    setCompany("");
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filtered = users
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const nameCompare =
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      return nameCompare;
    });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        👥 User Management
      </h1>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={toggleSortOrder}
          className="px-4 w-full max-w-[150px] h-[45px] bg-indigo-500 text-white rounded hover:bg-indigo-600 cursor-pointer"
        >
          Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        onSubmit={(e) => {
          e.preventDefault();
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
          className="col-span-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Add User
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
    </div>
  );
};

export default Users;
