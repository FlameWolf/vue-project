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
	<Transition name="bounce">
		<span v-if="show" class="badge text-bg-info ms-2">Here is some bouncy text!</span>
	</Transition>
	<hr />
</template>
<style>
	/* Unnamed animation */
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}
	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
	/* Fade animation */
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease-in-out;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
	/* Bounce animation */
	.bounce-enter-active {
		animation: bounce-in 0.5s;
	}
	.bounce-leave-active {
		animation: bounce-in 0.5s reverse;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.25);
		}
		100% {
			transform: scale(1);
		}
	}
</style>