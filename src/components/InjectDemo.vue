<script setup lang="ts">
	import { computed, inject, ref, type ComputedRef, type Ref } from "vue";

	const count = inject<Ref<number>>("count", ref(0));
	const time = inject<ComputedRef<string>>(
		Symbol.for("time"),
		computed(() => {
			const date = new Date();
			return `Locally computed: ${date.toLocaleTimeString()}`;
		}),
		true
	);
</script>
<template>
	<div>
		<h2>Inject Demo</h2>
		<p>Count: {{ count }}</p>
		<p>Time: {{ time }}</p>
	</div>
	<hr/>
</template>