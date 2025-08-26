import { defineConfig } from 'vitest/config'
import { config } from 'dotenv'

export default defineConfig({
  test: {
    environment: 'node',
    pool: 'forks',
    server: {
      deps: {
        external: ['@prisma/client']
      }
    },
    setupFiles: ['./src/test-setup.ts'],
    env: {
      ...config({ path: '.env.test' }).parsed
    }
  }
})