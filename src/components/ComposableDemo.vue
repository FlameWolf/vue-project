<script setup lang="ts">
	import { ref, watch } from "vue";
	import { useFetch } from "@/composables/useFetch";
	import Spinner from "@/components/Spinner.vue";

	const isLoading = ref(true);
	const { data, error } = useFetch("https://jsonplaceholder.typicode.com/posts/1");

	watch([data, error], () => {
		isLoading.value = false;
	});
</script>
<template>
	<div>
		<h2>Composable Demo</h2>
		<Spinner v-if="isLoading"/>
		<div v-else-if="error">Error: {{ error.message }}</div>
		<div v-else>
			<h2>{{ data?.title }}</h2>
			<p>{{ data?.body }}</p>
		</div>
	</div>
</template>