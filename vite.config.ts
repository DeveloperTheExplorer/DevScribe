import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
		})
	],
	resolve: {
		alias: {
			process: "process/browser",
			stream: "stream-browserify",
			crypto: "crypto-browserify",
			zlib: "browserify-zlib",
			util: 'util'
		}
	}
});
