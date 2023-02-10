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
  },
});
