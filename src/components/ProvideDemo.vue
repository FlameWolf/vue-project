<script setup lang="ts">
	import { computed, provide, ref } from "vue";
	import InjectContainer from "@/components/InjectContainer.vue";

	const count = ref(0);
	const time = ref(new Date().toLocaleTimeString());
	provide("count", count);
	provide(Symbol.for("time"), computed(() => `Supplied from provider: ${time.value}`));
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