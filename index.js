import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON file
const configPath = path.join(__dirname, "defaultConfig.json");

// 🔹 GET - returns the default JSON config for any event
app.get("/api/settings/:eventId", (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    res.json(config);
  } catch (error) {
    console.error("Failed to read config JSON:", error);
    res.status(500).json({ error: "Failed to load config" });
  }
});

// 🔹 POST - update and save JSON
app.post("/api/settings/:eventId", (req, res) => {
  try {
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
    res.json(req.body);
  } catch (error) {
    console.error("Failed to save config JSON:", error);
    res.status(500).json({ error: "Failed to save config" });
  }
});

app.get("/health", (req,res) => {
  res.json({message: "Backend route is working"})
})

// Serve React build
app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start server
app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
