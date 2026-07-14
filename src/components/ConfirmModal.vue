<script setup lang="ts">
	import { onBeforeUnmount, onMounted } from "vue";
	import { emptyString } from "@/constants/common";
	import { ModalResponse, useConfirmModal } from "@/composables/useConfirmModal";

	const { isOpen, respond, dismiss, settings } = useConfirmModal();

	function selectOption(value: ModalResponse): void {
		respond(value);
	}

	function handleBackdropClick(): void {
		dismiss();
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (!isOpen.value) {
			return;
		}
		switch (event.key) {
			case "Escape":
			case "Cancel": {
				dismiss();
				break;
			}
			case "Enter":
			case "Accept": {
				const defaultResponse = settings.value?.options.find(option => option.default);
				if (defaultResponse) {
					respond(defaultResponse.value);
				}
				break;
			}
			default: {
				break;
			}
		}
	}

	onMounted(() => {
		document.addEventListener("keydown", handleKeydown);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("keydown", handleKeydown);
	});
</script>

<template>
	<Teleport to="body">
		<template v-if="isOpen && settings">
			<div class="modal-backdrop fade show"></div>
			<div class="modal fade show" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="app-modal-title" @click.self="handleBackdropClick">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 id="app-modal-title" class="modal-title">{{ settings.title }}</h5>
							<button v-if="settings.dismissible !== false" class="btn-close" aria-label="Close" @click="dismiss()"></button>
						</div>
						<div class="modal-body">
							<span>{{ settings.message }}</span>
						</div>
						<div class="modal-footer">
							<button v-for="option in settings.options" :key="option.value" class="btn" :class="`btn${option.default ? emptyString : `-outline`}-${option.type ?? `primary`}`" @click="selectOption(option.value)">{{ option.text }}</button>
						</div>
					</div>
				</div>
			</div>
		</template>
	</Teleport>
</template>