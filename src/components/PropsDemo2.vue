<script setup lang="ts">
	const { name, age, greeting, title, weapons } = defineProps({
		name: {
			type: String,
			required: true
		},
		age: {
			type: Number,
			validator(value: number, props) {
				if (props.name === "Admin") {
					return true;
				}
				return value > 0 && value <= 100;
			},
			default: 0
		},
		greeting: {
			type: String,
			default: "Hello"
		},
		title: {
			type: [String, null],
			required: true
		},
		weapons: {
			default(props: Record<keyof any, unknown>) {
				return {
					primary: {
						name: "Chakra",
						use: "Throw"
					},
					...((0 as unknown) || {
						secondary: {
							name: "Sword",
							use: "Slash"
						}
					})
				};
			}
		}
	});
	const currentYear = new Date().getFullYear();
	const yearsToAdd = 5;
</script>
<template>
	<h2>Props Demo V2</h2>
	<hr />
	<p>{{ greeting }}, {{ title }} {{ name }}.</p>
	<p>You are {{ age }} years old.</p>
	<p>In {{ currentYear + yearsToAdd }} you will be {{ age + yearsToAdd }} years old.</p>
	<p>Your primary weapon is {{ weapons.primary.name }} and it is used to {{ weapons.primary.use.toLowerCase() }}.</p>
	<p v-if="weapons.secondary">Your secondary weapon is {{ weapons.secondary.name }} and it is used to {{ weapons.secondary.use.toLowerCase() }}.</p>
	<hr />
</template>