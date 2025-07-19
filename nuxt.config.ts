// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/eslint", "@nuxthub/core"],
	devtools: { enabled: true },
	css: [
		"@picocss/pico",
	],
	compatibilityDate: "2025-07-15",
	nitro: {
		experimental: {
			tasks: true,
		},
	},
	hub: {
		database: true,
	},
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
});
