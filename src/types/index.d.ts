import type { Plugin } from "vue";
import type { i18Key } from "@/plugins/i18nPlugin";

global {
	declare const __BUILD_NUMBER__: string;
}

export module "vue" {
	interface ComponentCustomProperties {
		crypto: Crypto;
		i18nPlugin: Plugin;
		$translate: (key: i18Key) => string;
	}
}