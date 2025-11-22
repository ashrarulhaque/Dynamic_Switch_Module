import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { pages } from "./config";

import FeatureGuard from "./components/FeatureGuard";
import Registration from "./pages/Registration";
import Agenda from "./pages/Agenda";
import Chat from "./pages/Chat";
import Polling from "./pages/Polling";
import Unavailable from "./pages/Unavailable";
import Admin from "./pages/Admin";

export default function App() {
  const eventId = "default";
  const [settings, setSettings] = useState(null);

  const loadSettings = () => {
    fetch(`/settings/${eventId}`)
      .then((res) => res.json())
      .then((data) => setSettings(data));
  };

  useEffect(() => {
    loadSettings();
  }, []);

  if (!settings) return <div>Loading…</div>;

  const { modules } = settings;

  const getComponent = (name) => {
    switch (name) {
      case "Admin":
        return <Admin />;
      case "Registration":
        return <Registration />;
      case "Agenda":
        return <Agenda />;
      case "Chat":
        return <Chat />;
      case "Polling":
        return <Polling />;
      default:
        return <Unavailable />;
    }
  };

  return (
    <Router>
      {/* Navbar */}
      <nav className="w-full flex justify-center items-center mt-6">
        <div className="flex gap-3 bg-white/50 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg border border-white/30">
          {pages.map(
            ({ name, path }) =>
               (
                <NavLink
                  key={name}
                  to={path}
                  end={path === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow"
                        : "text-gray-600 hover:bg-white hover:border hover:border-indigo-300"
                    }`
                  }
                >
                  {name}
                </NavLink>
              )
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        {pages.map(({ name, path, moduleKey }) => (
          <Route
            key={name}
            path={path}
            element={
              !moduleKey ? (
                <Admin
                  onSettingsUpdated={loadSettings}
                />
              ) : (
                <FeatureGuard enabled={modules[moduleKey]}>
                  {getComponent(name)}
                </FeatureGuard>
              )
            }
          />
        ))}

        <Route path="*" element={<Unavailable />} />
      </Routes>
    </Router>
  );
}
