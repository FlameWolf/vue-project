<script setup lang="ts">
	import { ref } from "vue";

	const age = ref(0);
</script>
<template>
	<div class="d-flex gap-2">
		<span>The age is: {{ age }}</span>
		<button class="btn btn-primary" @click="age++">Increment</button>
		<button class="btn btn-primary" @click="age--">Decrement</button>
	</div>
</template>