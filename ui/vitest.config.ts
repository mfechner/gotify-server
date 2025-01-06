import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        setupFiles: './src/tests/puppeteerSetup.ts',
        globals: true,
        fileParallelism: false,
        isolate: false,
    },
});
