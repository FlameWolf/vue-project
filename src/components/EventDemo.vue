<script setup lang="ts">
	const { name, age, greeting, ageStep } = defineProps<{
		name: string;
		age: number;
		greeting: string;
		ageStep?: number;
	}>();
	const emit = defineEmits({
		increaseAge: (years: number) => {
			if (typeof years !== "number") {
				return false;
			}
			return true;
		},
		decreaseAge: (years: number) => {
			if (typeof years !== "number") {
				return false;
			}
			return true;
		}
	});
	const currentYear = new Date().getFullYear();
	const yearsToAdd = 5;
</script>
<template>
	<h2>Props Demo</h2>
	<hr/>
	<p>{{ greeting }}, {{ name }}.</p>
	<p>You are {{ age }} years old.</p>
	<p>In {{ currentYear + yearsToAdd }} you will be {{ age + yearsToAdd }} years old.</p>
	<div class="d-flex gap-2">
		<button class="btn btn-primary" @click="emit(`increaseAge`, ageStep ?? 1)">Increase Age</button>
		<button class="btn btn-primary" @click="emit('decreaseAge', ageStep ?? 1)">Decrease Age</button>
	</div>
	<hr/>
</template>