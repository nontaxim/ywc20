import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {TanStackRouterVite} from '@tanstack/router-plugin/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        TanStackRouterVite({target: 'react', autoCodeSplitting: true}),
        react(),
        tailwindcss(),
    ],
    test: {
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
        setupFiles: ['./src/setupTests/setupTests.ts'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
