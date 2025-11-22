import { useState, useEffect } from "react";

export default function Admin({ onSettingsUpdated }) {
  const eventId = "default";
  const [saving, setSaving] = useState(false);
  const [savedPopup, setSavedPopup] = useState(false);
  const [settings, setSettings] = useState();

  const loadSettings = () => {
    fetch(`/settings/${eventId}`)
      .then((res) => res.json())
      .then((data) => setSettings(data));
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const toggleModule = (key) => {
    setSettings((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [key]: !prev.modules[key],
      },
    }));
  };

  const saveSettings = () => {
    setSaving(true);
    fetch(`/api/settings/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    }).then(() => {
      setSaving(false);
      if (onSettingsUpdated) onSettingsUpdated();
      setSavedPopup(true);
      setTimeout(() => setSavedPopup(false), 2500);
    });
  };

  if (!settings) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white bg-opacity-70 backdrop-blur-xl p-8 shadow-2xl rounded-3xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Admin Module Settings
        </h2>

        <div className="space-y-4">
          {Object.keys(settings.modules).map((key) => (
            <div
              key={key}
              className="flex justify-between items-center bg-white bg-opacity-80 p-4 rounded-xl shadow-md"
            >
              <span className="capitalize text-lg font-medium text-gray-700">
                {key}
              </span>

              {/* Modern Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.modules[key]}
                  onChange={() => toggleModule(key)}
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-500 transition"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition peer-checked:translate-x-6"></div>
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={saveSettings}
          disabled={saving}
          className={`mt-8 w-full py-3 rounded-xl text-white font-semibold transition transform hover:scale-[1.02] active:scale-95 
            ${
              saving
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Success Toast */}
      {savedPopup && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl animate-bounce">
          ✓ Settings Saved Successfully
        </div>
      )}
    </div>
  );
}
