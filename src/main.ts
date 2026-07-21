import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import RegDemo from "@/components/RegDemo.vue";

(function () {
	const app = createApp(App);
	app.use(router);
	app.component("RegistrationDemo", RegDemo);
	app.mount("#app");
})();