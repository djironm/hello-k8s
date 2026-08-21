const { spawn } = require('child_process');

const server = spawn('node', ['index.js'], {
  stdio: 'inherit'
});

async function run() {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch('http://127.0.0.1:3000/health');

    if (!response.ok) {
      throw new Error(`Expected HTTP 200, got ${response.status}`);
    }

    const body = await response.json();

    if (body.status !== 'ok') {
      throw new Error(`Expected status "ok", got "${body.status}"`);
    }

    console.log('Health check test passed');
    process.exitCode = 0;
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    server.kill();
  }
}

run();
