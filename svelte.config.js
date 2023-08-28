import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { mdsvex, escapeSvelte } from 'mdsvex'
import shiki from 'shiki'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await shiki.getHighlighter({
				theme: 'vitesse-dark'
			})
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang
				})
			)
			return `{@html \`${html}\` }`
		}
	},
	remarkPlugins: [
		remarkUnwrapImages,
		[
			remarkToc,
			{
				tight: true
			}
		]
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: seqPreprocessor([vitePreprocess(), mdsvex(mdsvexOptions), preprocessThrelte()]),
	kit: {
		adapter: adapter()
	}
}

export default config
