<script setup lang="ts">
	import { defineAsyncComponent, useTemplateRef } from "vue";
	import Spinner from "@/components/Spinner.vue";
	import Error from "@/components/Error.vue";

	const testComp = defineAsyncComponent({
		loader: async () => {
			await new Promise(resolve => setTimeout(resolve, 2000));
			return import("./TestComponent.vue");
		},
		loadingComponent: Spinner,
		errorComponent: Error
	});
	const asyncRef = useTemplateRef("async-ref");
</script>
<template>
	<div>
		<h2>Async Component Demo</h2>
		<test-comp ref="async-ref"/>
		<p><code>stringRef</code> exposed by the async component is: {{ asyncRef?.stringRef }}</p>
		<p><code>numRef</code> exposed by the async component is: {{ asyncRef?.numRef }}</p>
		<p><code>funcRef</code> exposed by the async component is: {{ asyncRef?.funcRef }}</p>
	</div>
	<hr/>
</template>