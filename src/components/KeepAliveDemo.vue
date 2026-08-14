<script setup lang="ts">
	import { ref } from "vue";
	import CounterDemo from "@/components/CounterDemo.vue";
	import FormDemo2 from "@/components/FormDemo2.vue";

	type DynamicComponent = typeof CounterDemo | typeof FormDemo2;
	const activeComponent = ref<DynamicComponent>(CounterDemo);
</script>
<template>
	<div>
		<h4>Component not kept alive:</h4>
		<component :is="activeComponent"/>
	</div>
	<hr/>
	<div class="d-flex gap-2">
		<span>Active Control:</span>
		<button class="btn btn-primary" @click="activeComponent = CounterDemo">Age</button>
		<button class="btn btn-primary" @click="activeComponent = FormDemo2">Name</button>
	</div>
	<hr/>
	<h4>Component kept alive:</h4>
	<KeepAlive>
		<component :is="activeComponent"/>
	</KeepAlive>
	<hr/>
</template>