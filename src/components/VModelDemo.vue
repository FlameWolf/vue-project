<script setup lang="ts">
	const model = defineModel<{
		name: string;
		age: number;
	}>();

	function updateModel(newName: string, newAge: number) {
		if (!model.value) {
			return;
		}
		model.value.name = newName;
		model.value.age = newAge;
	}
</script>
<template>
	<p>Hello, {{ model?.name ?? "Anonymous" }}</p>
	<p>You are {{ model?.age ?? 0 }} years old.</p>
	<hr/>
	<button class="btn btn-primary" @click="updateModel(crypto.randomUUID(), Math.round(Math.random() * 100))">Update Model</button>
	<hr/>
</template>