import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import i18nPlugin from "@/plugins/i18nPlugin.ts";
import RegDemo from "@/components/RegDemo.vue";

(function () {
	const app = createApp(App);
	app.use(router);
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