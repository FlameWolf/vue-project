<script setup lang="ts">
	import { inject } from "vue";

	const count = inject("count", 0);
</script>
<template>
	<div>
		<h2>Inject Demo</h2>
		<p>Count: {{ count }}</p>
	</div>
	<hr/>
</template>