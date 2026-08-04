<script setup lang="ts">
	import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

	const props = defineProps({
		initialState: { type: Boolean, default: false },
		autoClose: { type: Boolean, default: true }
	});
	const show = ref(props.initialState);
	const triggerRef = useTemplateRef("trigger-ref");
	const contentRef = useTemplateRef("content-ref");

	function toggle() {
		show.value = !show.value;
	}

	function clickedOutside(event: MouseEvent) {
		if (!triggerRef.value || !show.value) {
			return;
		}
		const target = event.target as Node;
		if (triggerRef.value.contains(target)) {
			return;
		}
		if (!props.autoClose && contentRef.value?.contains(target)) {
			return;
		}
		show.value = false;
	}

	onMounted(() => {
		document.addEventListener("click", clickedOutside);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("click", clickedOutside);
	});
</script>
<template>
	<div class="dropdown">
		<div ref="trigger-ref" class="d-contents" @click="toggle">
			<slot ref="trigger-ref" name="trigger-content"></slot>
		</div>
		<div v-if="show" ref="content-ref" class="d-contents">
			<slot name="dropdown-content"></slot>
		</div>
	</div>
</template>