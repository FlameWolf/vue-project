<script setup lang="ts">
	import { inject } from "vue";

	const count = inject("count", 0);
	const time = inject(
		Symbol.for("time"),
		() => {
			const date = new Date();
			return `Locally computed: ${date.toLocaleTimeString()}`;
		},
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