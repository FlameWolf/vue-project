import type { Plugin } from "vue";

export type i18Key = `${string}.${string}`;
type TranslationTree = { [key: string]: string | TranslationTree };

const i18nPlugin: Plugin = {
	install(app, options: Record<string, any>) {
		app.config.globalProperties.$translate = (key: i18Key): string => {
			const result = key.split(".").reduce<string | TranslationTree | undefined>((acc, curr) => (typeof acc === "object" ? acc[curr] : undefined), options as TranslationTree);
			return typeof result === "string" ? result : key;
		};
	}
};

export default i18nPlugin;