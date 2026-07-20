<script setup lang="ts">
	const { name, age, greeting } = defineProps<{
		name: string;
		age: number;
		greeting: string;
	}>();
	const currentYear = (new Date()).getFullYear();
	const yearsToAdd = 5;
</script>
<template>
	<h2>Props Demo</h2>
	<hr/>
	<p>{{ greeting }}, {{ name }}.</p>
	<p>You are {{ age }} years old.</p>
	<p>In {{ currentYear + yearsToAdd }} you will be {{ age + yearsToAdd }} years old.</p>
	<hr/>
</template>