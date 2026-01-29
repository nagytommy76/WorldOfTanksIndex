/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJest from 'next/jest.js'
import type { Config } from 'jest'

const createJestConfig = nextJest({
   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
   dir: './',
})

const config: Config = {
   // All imported modules in your tests should be mocked automatically
   // automock: false,

   verbose: true,

   preset: 'ts-jest',

   testEnvironment: 'jsdom',

   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

   // Automatically clear mock calls, instances, contexts and results before every test
   clearMocks: true,

   // The glob patterns Jest uses to detect test files
   testMatch: ['**/?(*.)+(spec|test).?([mc])[jt]s?(x)'],
}

export default createJestConfig(config)
