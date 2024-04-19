import { sveltekit } from '@sveltejs/kit/vite';
import viteTs from 'vite-plugin-ts';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		viteTs(),
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	],
	resolve: {
		alias: {
			process: 'process/browser',
			stream: 'stream-browserify',
			crypto: 'crypto-browserify',
			zlib: 'browserify-zlib',
			util: 'util'
		}
	}
});
