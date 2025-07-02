# Sahej Pilot

## Folder Structure
```
sahej_pilot_operations/
  ├── public/                # Static assets
  ├── src/
  │   ├── app/              # Next.js app directory
  │   ├── components/       # Shared UI components
  │   ├── custompages/      # Feature modules
  │   └── styles/           # Tailwind and global CSS
  ├── README.md
  ├── package.json
  ├── tsconfig.json
  ├── tailwind.config.ts
  └── ...
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn

### Setup
```bash
pnpm install
# or
npm install
```

### Development
```bash
pnpm dev
# or
npm run dev
```

### Type Checking
```bash
pnpm tsc --noEmit
```

### Linting & Formatting
```bash
pnpm lint
pnpm format
```

### Production Build
```bash
pnpm build
```

## Best Practices
- Write strict TypeScript types
- Use environment variables for secrets/config
- Run `pnpm tsc --noEmit` and `pnpm lint` before every commit
