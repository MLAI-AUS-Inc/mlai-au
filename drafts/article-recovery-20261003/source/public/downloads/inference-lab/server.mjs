import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
import { infer } from './model.mjs';

export async function startServer(port = 0) {
  const server = createServer((req, res) => {
    const reply = (code, payload) => {
      if (res.writableEnded) return;
      res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Connection': 'close' });
      res.end(JSON.stringify(payload));
    };
    if (req.url !== '/predict') { req.resume(); return reply(404, { error: 'not-found' }); }
    if (req.method !== 'POST') { req.resume(); return reply(405, { error: 'use-post' }); }
    if (req.headers['content-type']?.split(';')[0] !== 'application/json') { req.resume(); return reply(415, { error: 'use-json' }); }
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > 4096) { chunks.length = 0; reply(413, { error: 'body-too-large' }); }
      else if (!res.writableEnded) chunks.push(chunk);
    });
    req.on('end', () => {
      if (res.writableEnded) return;
      try { reply(200, infer(JSON.parse(Buffer.concat(chunks).toString('utf8')))); }
      catch { reply(400, { error: 'invalid-input' }); }
    });
    req.on('error', () => reply(400, { error: 'request-error' }));
  });
  server.requestTimeout = 5000;
  server.headersTimeout = 5000;
  server.setTimeout(5000, socket => socket.destroy());
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = await startServer();
  console.log(`Synthetic inference lab: http://127.0.0.1:${server.address().port}/predict (Ctrl+C to stop)`);
}
