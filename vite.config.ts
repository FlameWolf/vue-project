import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";

let semVer = "1.0.0";
const semVerFile = "./dist/.__semver";
const useSemVerFile = process.env.NODE_ENV === "production";

function updateSemVer(version: string) {
	const components = version.match(/^(\d+)\.(\d+)\.(\d+)/);
	if (!components) {
		throw new Error(`Invalid semantic version format. Expected "X.Y.Z"`);
	}
	let [major, minor, patch] = components.toSpliced(0, 1).map(x => parseInt(x, 10));
	patch += 1;
	if (patch > 99) {
		minor += 1;
		patch = 0;
		if (minor > 9) {
			major += 1;
			minor = 0;
		}
	}
	return `${major}.${minor}.${patch}`;
}

if (useSemVerFile) {
	try {
		if (fs.existsSync(semVerFile)) {
			semVer = updateSemVer(fs.readFileSync(semVerFile, "utf8"));
		}
	} catch (err) {
		console.error("Failed to update build number:", err);
	}
} else {
	semVer = "Dev";
}

export default defineConfig({
	plugins: [
		vue(),
		{
			name: "post-build-actions",
			closeBundle() {
				if (useSemVerFile) {
					try {
						fs.writeFileSync(semVerFile, semVer.toString());
					} catch (err) {
						console.error("Failed to write build number file:", err);
					}
				}
			}
		}
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	define: {
		__BUILD_NUMBER__: `"${semVer}"`
	}
});