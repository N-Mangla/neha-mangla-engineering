import { spawn } from "node:child_process";
import { test, after } from "node:test";
import assert from "node:assert/strict";

const port = 3107;
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
  stdio: "ignore",
  env: { ...process.env, PORT: String(port), NODE_ENV: "production" },
});

after(() => server.kill("SIGTERM"));

async function ready() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) throw new Error("Portfolio server exited unexpectedly");
    try {
      const response = await fetch(base);
      if (response.ok) return;
    } catch {
      // Server not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Portfolio server did not become ready");
}

test("published portfolio routes render useful HTML", async () => {
  await ready();
  const routes = [
    ["/", "Complex systems."],
    ["/work/workforce-calendar", "calendar"],
    ["/work/custom-metrics-import", "metrics"],
    ["/work/coaching-effectiveness", "coaching"],
    ["/blog", "Engineering Notes"],
  ];

  for (const [route, expected] of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, `${route} should return HTTP 200`);
    const html = await response.text();
    assert.match(html.toLowerCase(), new RegExp(expected.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${route} should render relevant content`);
  }
});

test("unknown pages return HTTP 404", async () => {
  await ready();
  const response = await fetch(base + "/not-a-real-portfolio-page");
  assert.equal(response.status, 404);
});
