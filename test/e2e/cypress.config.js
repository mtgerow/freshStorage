import path from 'path'
import { defineConfig } from "cypress";
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on(
        'dev-server:start',
        vitePreprocessor('./vite.config.js')
      )
    },
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/e2e/**/*.cy.slow.{js,jsx,ts,tsx}'
    ]
  },
});
