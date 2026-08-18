// src/server.ts
import { createServer, IncomingMessage, ServerResponse } from "node:http";

const PORT = Number(process.env.PORT) || 3000;

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

function sendJson(
  res: ServerResponse,
  statusCode: number,
  body: JsonValue,
): void {
  const payload = JSON.stringify(body);

  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
  });

  res.end(payload);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestHandler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const method = req.method ?? "GET";
  const url = req.url ?? "/";

  if (method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  if (url === "/") {
    sendJson(res, 200, {
      message: "Hello from hello-k8s!",
      version: "1.0.0",
    });
    return;
  }

  if (url === "/health") {
    sendJson(res, 200, {
      status: "ok",
      uptime: process.uptime(),
    });
    return;
  }

  if (url === "/slow") {
    await sleep(5000);
    sendJson(res, 200, { message: "That was slow..." });
    return;
  }

  if (url === "/crash") {
    sendJson(res, 500, { error: "Server is crashing" });
    process.nextTick(() => process.exit(1));
    return;
  }

  sendJson(res, 404, { error: "Not found" });
}

const server = createServer((req, res) => {
  requestHandler(req, res).catch((error: unknown) => {
    console.error("Unhandled request error:", error);
    sendJson(res, 500, { error: "Internal server error" });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});