<script setup lang="ts">
	import { ref } from "vue";

	const show = ref(true);
	const age = ref(1);
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
	<div class="d-flex gap-4 align-items-center w-50 p-2 border rounded">
		<div>Age:</div>
		<Transition name="scroll" mode="out-in">
			<div :key="age" class="fw-bold">{{ age }}</div>
		</Transition>
		<div class="input-group w-auto ms-auto">
			<button class="btn btn-primary" @click="age++">+</button>
			<button class="btn btn-primary" @click="age--">-</button>
		</div>
	</div>
	<hr/>
	<div class="d-flex gap-4 align-items-center w-50 p-2 border rounded">
		<Transition name="bounce" mode="out-in">
			<component :is="age % 2 === 0 ? `button` : `a`" class="btn btn-primary">{{ age }}</component>
		</Transition>
	</div>
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
	/* Scroll animation */
	.scroll-enter-active,
	.scroll-leave-active {
		transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
	}
	.scroll-enter-from {
		transform: translateY(-100%);
		opacity: 0;
	}
	.scroll-leave-to {
		transform: translateY(100%);
		opacity: 0;
	}
</style>