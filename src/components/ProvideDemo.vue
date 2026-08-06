<script setup lang="ts">
	import { provide, ref } from "vue";
	import InjectContainer from "@/components/InjectContainer.vue";

	const count = ref(0);
	provide("count", count);
</script>
<template>
	<div>
		<h2>Provide Demo</h2>
		<p>Count: {{ count }}</p>
		<button class="btn btn-primary" @click="count++">Increment</button>
	</div>
	<hr/>
	<InjectContainer/>
</template>