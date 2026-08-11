<script setup lang="ts">
	import { ref } from "vue";

	const show = ref(true);
</script>
<template>
	<button class="btn btn-primary" @click="show = !show">Toggle</button>
	<Transition>
		<span v-if="show" class="badge text-bg-secondary ms-2">Unnamed Transition</span>
	</Transition>
	<Transition name="fade">
		<span v-if="show" class="badge text-bg-info ms-2">Named Transition</span>
	</Transition>
	<hr/>
</template>
<style>
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease-in-out;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>