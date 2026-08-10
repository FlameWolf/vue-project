import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import demoPlugin from "@/plugins/demoPlugin.ts";
import i18nPlugin from "@/plugins/i18nPlugin.ts";
import RegDemo from "@/components/RegDemo.vue";

(function () {
	const app = createApp(App);
	app.use(router);
	app.use(demoPlugin, { name: "Jane Doe", age: 21 }, 2048, "Test", new Date());
	app.use(i18nPlugin, {
		greetings: {
			hello: "Bonjour!",
			goodbye: "Adieu!"
		}
	});
	app.component("RegistrationDemo", RegDemo);
	app.config.globalProperties.crypto = window.crypto;
	app.mount("#app");
})();