<script setup lang="ts">
	import { defineAsyncComponent, useTemplateRef } from "vue";

	const testComp = defineAsyncComponent(() => import("./TestComponent.vue"));
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