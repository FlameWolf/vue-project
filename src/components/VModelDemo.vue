<script setup lang="ts">
	const [model, modifiers] = defineModel<
		{
			name: string;
			age: number;
		},
		"first" | "capitalise" | "trim"
	>();

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
	<p v-if="modifiers.first">The "first" modifier is present</p>
	<p v-if="modifiers.capitalise">The "capitalise" modifier is present</p>
	<p v-if="modifiers.trim">The "trim" modifier is present</p>
	<hr/>
	<button class="btn btn-primary" @click="updateModel(crypto.randomUUID(), Math.round(Math.random() * 100))">Update Model</button>
	<hr/>
</template>