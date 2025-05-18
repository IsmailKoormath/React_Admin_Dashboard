import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Card from "../components/Card";
import GraphCard from "../components/GraphCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { UserGroupIcon, BoltIcon, ClockIcon } from "@heroicons/react/24/solid";



const stats = {
  usersCount: 120,
  activeSessions: 45,
  pendingRequests: 8,
};

const registrationsData = [
  { month: "Jan", registrations: 30 },
  { month: "Feb", registrations: 45 },
  { month: "Mar", registrations: 60 },
  { month: "Apr", registrations: 40 },
  { month: "May", registrations: 80 },
  { month: "Jun", registrations: 70 },
];

const userRolesData = [
  { role: "Admin", count: 5 },
  { role: "Editor", count: 12 },
  { role: "Viewer", count: 25 },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const darkMode = useAppSelector((state) => state.theme.darkMode); // Only for chart strokes

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded bg-gray-300 dark:bg-gray-700"
              ></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="h-80 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-80 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(stats).map(([label, value]) => {
              let icon;

              switch (label) {
                case "usersCount":
                  icon = <UserGroupIcon className="w-8 h-8" />;
                  break;
                case "activeSessions":
                  icon = <BoltIcon className="w-8 h-8" />;
                  break;
                case "pendingRequests":
                  icon = <ClockIcon className="w-8 h-8" />;
                  break;
                default:
                  icon = null;
              }

              return (
                <Card key={label} label={label} value={value} icon={icon} />
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GraphCard title="User Registrations">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={registrationsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? "#444" : "#ddd"}
                  />
                  <XAxis dataKey="month" stroke={darkMode ? "#fff" : "#000"} />
                  <YAxis stroke={darkMode ? "#fff" : "#000"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#fff",
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      color: darkMode ? "#fff" : "#000",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </GraphCard>

            <GraphCard title="Active Users by Role">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userRolesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? "#444" : "#ddd"}
                  />
                  <XAxis dataKey="role" stroke={darkMode ? "#fff" : "#000"} />
                  <YAxis stroke={darkMode ? "#fff" : "#000"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#fff",
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      color: darkMode ? "#fff" : "#000",
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </GraphCard>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
