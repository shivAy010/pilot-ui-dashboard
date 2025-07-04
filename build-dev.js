#!/usr/bin/env node
const { spawn } = require('child_process');

// Run vite build in development mode
const child = spawn('npx', ['vite', 'build', '--mode', 'development'], {
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  process.exit(code);
});