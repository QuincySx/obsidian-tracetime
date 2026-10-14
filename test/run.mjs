import { build } from "esbuild";
import { spawnSync } from "node:child_process";

// Obsidian's npm package contains types only. Mock the host API in tests,
// while keeping the production build and its external imports unchanged.
const obsidianMock = {
	name: "obsidian-test-host",
	setup(builder) {
		builder.onResolve({ filter: /^obsidian$/ }, () => ({
			path: "obsidian",
			namespace: "obsidian-test-host",
		}));
		builder.onLoad({ filter: /.*/, namespace: "obsidian-test-host" }, () => ({
			contents: 'export const moment = { locale: () => process.env.TRACETIME_TEST_LOCALE };',
			loader: "js",
		}));
	},
};

async function bundle(entryPoint) {
	const result = await build({
		entryPoints: [entryPoint],
		bundle: true,
		platform: "node",
		format: "cjs",
		target: "es2020",
		write: false,
		plugins: [obsidianMock],
	});
	return result.outputFiles[0].text;
}

function run(source, locale, expected = "zh") {
	// Each process gets fresh module state: locales are resolved at import time.
	const result = spawnSync(process.execPath, ["--input-type=commonjs"], {
		input: source,
		stdio: ["pipe", "inherit", "inherit"],
		env: { ...process.env, TRACETIME_TEST_LOCALE: locale, TRACETIME_TEST_EXPECTED: expected },
	});
	if (result.error) throw result.error;
	if (result.status !== 0) throw new Error(`Tests failed for ${locale} (${result.signal ?? result.status})`);
}

run(await bundle("test/selftest.ts"), "zh-cn");
const localeTests = await bundle("test/locales.ts");
for (const [locale, expected] of [
	["en", "en"], ["en-gb", "en"],
	["zh", "zh"], ["zh-cn", "zh"], ["zh-tw", "zh"],
	["pt-br", "pt"], ["pt", "pt"], ["pt-pt", "pt"],
	["fr", "en"], ["test", "en"],
]) run(localeTests, locale, expected);
