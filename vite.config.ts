import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({ build: { rollupOptions: { input: { main: fileURLToPath(new URL('./index.html', import.meta.url)), education: fileURLToPath(new URL('./education.html', import.meta.url)), experience: fileURLToPath(new URL('./experience.html', import.meta.url)) } } }, plugins: [react(), tailwindcss()], resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } } });
