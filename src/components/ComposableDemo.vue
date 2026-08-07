<script setup lang="ts">
	import { ref, watch } from "vue";
	import { emptyString } from "@/constants/common";
	import { useFetch } from "@/composables/useFetch";
	import Spinner from "@/components/Spinner.vue";

	const isLoading = ref(true);
	const url = ref("https://jsonplaceholder.typicode.com/posts/1");
	const { data, error } = useFetch(url);

	function reFetch() {
		url.value = emptyString;
		isLoading.value = true;
		requestAnimationFrame(() => {
			url.value = "https://jsonplaceholder.typicode.com/posts/2";
		});
	}

	watch([data, error], () => {
		isLoading.value = false;
	});
</script>
<template>
	<div>
		<h2>Composable Demo</h2>
		<Spinner v-if="isLoading" />
		<div v-else-if="error">Error: {{ error.message }}</div>
		<div v-else>
			<h2>{{ data?.title }}</h2>
			<p>{{ data?.body }}</p>
		</div>
		<hr />
		<button class="btn btn-primary" @click="reFetch">Fetch Post 2</button>
	</div>
	<hr />
</template>