#!/usr/bin/env node

// This script attempts to work around the missing build:dev script
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Emergency build script starting...');

try {
  // Check if package.json exists
  const packagePath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packagePath)) {
    console.error('❌ No package.json found');
    process.exit(1);
  }

  // Try to run vite build directly
  console.log('📦 Running vite build in development mode...');
  execSync('npx vite build --mode development', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.log('\n💡 To fix this permanently, add this to your package.json scripts:');
  console.log('"build:dev": "vite build --mode development"');
  process.exit(1);
}