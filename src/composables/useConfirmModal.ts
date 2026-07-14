import { readonly, ref, shallowRef } from "vue";

export enum ModalResponse {
	Cancel = "cancel",
	Confirm = "confirm",
	Dismiss = "dismiss"
}
export interface ResponseOption {
	text: string;
	value: ModalResponse;
	default?: boolean;
	type?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
}
export interface ModalSettings {
	title: string;
	message: string;
	options: ResponseOption[];
	dismissible?: boolean;
}

let resolver: ((response: ModalResponse) => void) | undefined;
const isOpen = ref(false);
const settings = shallowRef<ModalSettings>();

export function confirm(options: ModalSettings): Promise<ModalResponse> {
	if (resolver) {
		return Promise.reject(new Error("A modal dialogue is already open."));
	}
	settings.value = options;
	isOpen.value = true;
	return new Promise<ModalResponse>(resolve => {
		resolver = resolve;
	});
}

function respond(response: ModalResponse): void {
	if (!resolver) {
		return;
	}
	const resolve = resolver;
	resolver = undefined;
	isOpen.value = false;
	settings.value = undefined;
	resolve(response);
}

function dismiss(): void {
	if (!settings.value?.dismissible === false) {
		return;
	}
	respond(ModalResponse.Dismiss);
}

export function useConfirmModal() {
	return {
		isOpen: readonly(isOpen),
		settings: readonly(settings),
		respond,
		dismiss
	};
}