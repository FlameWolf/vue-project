import type { Plugin } from "vue";

const demoPlugin: Plugin = {
	install(app, ...options) {
		app.provide("demoPlugin", options);
	}
};

export default demoPlugin;