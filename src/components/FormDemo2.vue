<script setup lang="ts">
	import { ref } from "vue";

	const name = ref("Jane");
</script>
<template>
	<div class="d-flex gap-4">
		<input type="text" class="form-control w-auto" v-model="name" />
		<span>The name is: {{ name }}</span>
	</div>
</template>