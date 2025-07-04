// Emergency build script - run with: node emergency-build.js
import { build } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function buildDev() {
  try {
    console.log('Starting development build...')
    await build({
      mode: 'development',
      configFile: path.resolve(__dirname, 'vite.config.ts')
    })
    console.log('Build completed successfully!')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

buildDev()