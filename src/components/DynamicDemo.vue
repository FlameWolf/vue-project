<script setup lang="ts">
	import { ref, useTemplateRef, watch, type ComponentInstance } from "vue";
	import EventDemo from "@/components/EventDemo.vue";
	import PropsDemo from "@/components/PropsDemo.vue";
	import RefDemo from "@/components/RefDemo.vue";
	import SlotDemo from "@/components/SlotDemo.vue";

	type ValidComponent = typeof EventDemo | typeof PropsDemo | typeof RefDemo | typeof SlotDemo;

	const ordinal = ref(0);
	const activeComponent = ref<ValidComponent | null>();

	function updateComponent() {
		ordinal.value = (ordinal.value + 1) % 4;
	}

	watch(
		ordinal,
		value => {
			switch (value) {
				case 0: {
					activeComponent.value = EventDemo;
					break;
				}
				case 1: {
					activeComponent.value = PropsDemo;
					break;
				}
				case 2: {
					activeComponent.value = RefDemo;
					break;
				}
				case 3: {
					activeComponent.value = SlotDemo;
					break;
				}
				default: {
					break;
				}
			}
		},
		{ immediate: true }
	);
</script>
<template>
	<h2>Dynamic components</h2>
	<hr/>
	<button class="btn btn-primary" @click="updateComponent">Click to change</button>
	<span class="ms-2">Current component: {{ activeComponent?.__name }}</span>
	<hr/>
	<component :is="activeComponent" name="Someone" :age="25" greeting="Hello">
		<p>Slot content!</p>
	</component>
	<hr/>
	<div>
		<EventDemo name="Ivan" :age="20" greeting="Hello" :age-step="2"/>
		<PropsDemo name="John" :age="20" greeting="Hello"/>
		<RefDemo/>
		<SlotDemo>
			<p>This content is displayed inside the slot.</p>
			<hr/>
			<p>End of slot content.</p>
		</SlotDemo>
	</div>
</template>