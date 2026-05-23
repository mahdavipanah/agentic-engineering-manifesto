// @ts-check
import { defineConfig } from 'astro/config';

const repository = process.env.GITHUB_REPOSITORY;
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repoName = repository?.split('/')[1];
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site:
		isGitHubActions && owner ? `https://${owner}.github.io` : 'http://localhost:4321',
	base: isGitHubActions && repoName ? `/${repoName}` : '/',
});
