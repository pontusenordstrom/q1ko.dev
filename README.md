# [dromzeh.dev]("https://dromzeh.dev")

![MIT](https://img.shields.io/badge/license-MIT-blue)

Source code for my personal website, `dromzeh.dev`.

**Uses:**
-   [Svelte](https://svelte.dev/) & [SvelteKit](https://kit.svelte.dev/).
-   [TailwindCSS](https://tailwindcss.com/) & [Font Awesome](https://fontawesome.com/).
-   [MDSveX](https://mdsvex.com/) & [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)
-   Deployment is done using [Cloudflare Pages](https://pages.cloudflare.com/).

[Lanyard](https://api.lanyard.rest/) is used to show Discord Status, Spotify Information, etc. You can view how this is done inside `./src/components/Lanyard.svelte`.

## Running the Site

Development:

```bash
  pnpm i && pnpm dev # unless changed in package.json, it'll run at port 1337..
```

Building:

```bash
  pnpm i && pnpm build
```

## License

dromzeh.dev is licensed under [MIT](https://mit.dromzeh.dev/).
