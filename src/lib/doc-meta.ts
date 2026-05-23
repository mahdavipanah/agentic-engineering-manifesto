import fs from 'node:fs/promises';
import path from 'node:path';

export const MANIFESTO_MARKDOWN_FILE = 'agentic-engineering-manifesto.md';

export interface DocMeta {
	title: string;
	titleLines: string[];
	subtitle: string;
	docMark: string;
	version: string;
	status: string;
	published: string;
	description: string;
}

export interface DocDocument {
	meta: DocMeta;
	body: string;
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseFrontmatterBlock(yaml: string): Record<string, string> {
	const result: Record<string, string> = {};
	for (const line of yaml.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const colon = trimmed.indexOf(':');
		if (colon === -1) continue;
		const key = trimmed.slice(0, colon).trim();
		let value = trimmed.slice(colon + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		result[key] = value;
	}
	return result;
}

function parseTitleLines(raw: string | undefined, title: string): string[] {
	if (raw?.trim()) {
		return raw
			.split('|')
			.map((line) => line.trim())
			.filter(Boolean);
	}
	return [title];
}

function metaFromFrontmatter(fields: Record<string, string>): DocMeta {
	const title = fields.title?.trim();
	if (!title) {
		throw new Error('Manifesto frontmatter must include "title".');
	}

	return {
		title,
		titleLines: parseTitleLines(fields.titleLines, title),
		subtitle: fields.subtitle?.trim() ?? '',
		docMark: fields.docMark?.trim() ?? 'Manifesto',
		version: fields.version?.trim() ?? '',
		status: fields.status?.trim() ?? '',
		published: fields.published?.trim() ?? '',
		description: fields.description?.trim() ?? '',
	};
}

/** Parse legacy markdown header when no YAML frontmatter is present. */
function metaFromMarkdownHeader(body: string): { meta: DocMeta; body: string } {
	const titleMatch = body.match(/^#\s+(.+?)\s*$/m);
	const subtitleMatch = body.match(/^\*([^*]+)\*\s*$/m);
	const versionMatch = body.match(/^\*\*Version\s+(.+?)\*\*\s*$/im);

	const title = titleMatch?.[1]?.trim() ?? 'Manifesto';
	let rest = body;

	if (titleMatch) {
		rest = rest.replace(/^#\s+.+?\s*$/m, '');
	}
	if (subtitleMatch) {
		rest = rest.replace(/^\*[^*]+\*\s*$/m, '');
	}
	if (versionMatch) {
		rest = rest.replace(/^\*\*Version\s+.+?\*\*\s*$/im, '');
	}
	rest = rest.replace(/^---\s*$/m, '').trimStart();

	const meta: DocMeta = {
		title,
		titleLines: parseTitleLines(undefined, title),
		subtitle: subtitleMatch?.[1]?.trim() ?? '',
		docMark: 'Manifesto',
		version: versionMatch?.[1]?.trim() ?? '',
		status: '',
		published: '',
		description: '',
	};

	return { meta, body: rest };
}

export function parseDocDocument(content: string): DocDocument {
	const match = content.match(FRONTMATTER_RE);
	if (!match) {
		const { meta, body } = metaFromMarkdownHeader(content);
		return { meta, body };
	}

	const fields = parseFrontmatterBlock(match[1]);
	const body = content.slice(match[0].length).trimStart();
	return {
		meta: metaFromFrontmatter(fields),
		body,
	};
}

export async function loadDocDocument(
	cwd: string = process.cwd(),
	filename: string = MANIFESTO_MARKDOWN_FILE,
): Promise<DocDocument> {
	const markdownPath = path.resolve(cwd, filename);
	const content = await fs.readFile(markdownPath, 'utf8');
	return parseDocDocument(content);
}
