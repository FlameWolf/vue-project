<script setup lang="ts">
	import { ref, watch } from "vue";

	const separator = ", ";
	const arrayRef = ref([1, 2, 3]);
	const updated = ref<Date>();

	function updateArray() {
		const copy = arrayRef.value;
		copy.push(...copy.slice(-3).map(x => x + 3));
	}

	watch(
		arrayRef,
		() => {
			updated.value = new Date();
		},
		{ deep: true }
	);
</script>
<template>
	<h2>Reactive Array Behaviour Demo</h2>
	<p>The value of<code>arrayRef</code> is: {{ arrayRef.join(separator) }}</p>
	<button class="btn btn-primary" @click="updateArray">Update</button>
	<hr/>
	<p ref="update" v-if="updated">Array updated at: {{ updated.toISOString() }}</p>
	<hr/>
</template>