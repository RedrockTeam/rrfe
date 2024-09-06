import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: [
			"**/*.{test,spec}.?(c|m)[jt]s?(x)",
			"./src/**/__test__/*.?(c|m)[jt]s?(x)",
		],
	},
});
