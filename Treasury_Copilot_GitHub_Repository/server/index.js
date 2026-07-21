import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { analyze } from "./analyze.js";
import { config, publicConfig } from "./config.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "256kb" }));

const fixturePath = path.resolve(config.appRoot, "fixtures/sanitized-reconciliation.json");

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "Treasury Intelligence Layer", readOnly: true, config: publicConfig() }));
app.get("/api/fixture", async (_req, res, next) => { try { res.type("json").send(await fs.readFile(fixturePath, "utf8")); } catch (error) { next(error); } });
app.post("/api/analyze", async (req, res, next) => {
  try { res.json(await analyze(req.body.snapshot, config, { preferLiveAi: req.body.mode !== "fallback" })); }
  catch (error) { next(error); }
});

const dist = path.resolve(config.appRoot, "dist");
app.use(express.static(dist));
app.use((req, res, next) => req.method === "GET" ? res.sendFile(path.join(dist, "index.html")) : next());
app.use((error, _req, res, _next) => res.status(400).json({ error: "Analysis could not be completed safely.", detail: config.mode === "development" ? error.message : undefined, statePreserved: true }));

app.listen(config.port, "127.0.0.1", () => console.log(`Treasury Copilot listening on http://127.0.0.1:${config.port}`));
