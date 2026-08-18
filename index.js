const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log(
    `${new Date().toISOString()} ${req.method} ${req.url}`
  );
  res.json({ message: 'Hello from hello-k8s!', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/slow', async (req, res) => {
  const start = Date.now();

  await new Promise(resolve => setTimeout(resolve, 5000));

  const elapsedMs = Date.now() - start;

  console.log(`Request took ${elapsedMs} ms`);
  
  res.json({ message: 'That was slow...' });
});

app.get('/crash', (req, res) => {
  process.exit(1);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
