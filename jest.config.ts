import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // caminho correto p o app Next.js para carregar next.config.js e arquivos .env
  dir: './',
})

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // qdo usamos paths no tsconfig (como @/components/...)
    '^@/(.*)$': '<rootDir>/$1',
  },
}

export default createJestConfig(config)