<script setup lang="ts">
	import { ref } from "vue";

	const listItems = ref([crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()]);

	function addItem() {
		const index = Math.round(Math.random() * listItems.value.length);
		listItems.value.splice(index, 0, crypto.randomUUID());
	}

	function removeItem() {
		const index = Math.round(Math.random() * listItems.value.length);
		listItems.value.splice(index, 1);
	}

	function shuffle() {
		listItems.value.sort(() => Math.random() > 0.5 ? 1 : -1);
	}
</script>
<template>
	<div class="d-flex gap-2">
		<button class="btn btn-primary" @click="addItem">Add</button>
		<button class="btn btn-primary" @click="removeItem">Remove</button>
		<button class="btn btn-primary" @click="shuffle">Shuffle</button>
	</div>
	<hr />
	<ul class="list-group list-group-flush w-50">
		<TransitionGroup name="list">
			<li :key="item" v-for="item in listItems" class="list-group-item">{{ item }}</li>
		</TransitionGroup>
	</ul>
</template>
<style>
	/* List animation */
	.list-move,
	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}
	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(50%);
	}
	.list-leave-active {
		position: absolute;
	}
</style>