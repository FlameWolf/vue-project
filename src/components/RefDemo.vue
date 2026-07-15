<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";
import TestComponent from "@/components/TestComponent.vue";

const componentRef = useTemplateRef("test-component");
const arrayRef = useTemplateRef("items");
const itemCount = ref(0);

function updateComponentMembers() {
	if(componentRef.value) {
		componentRef.value.stringRef = crypto.randomUUID();
		componentRef.value.numRef++;
		componentRef.value.funcRef = () => {
			componentRef.value!.stringRef = `${componentRef.value!.numRef} && ${crypto.randomUUID()}`;
		};
	}
}

watch(arrayRef, items => {
	itemCount.value = items?.length ?? 0;
});
</script>
<template>
	<TestComponent ref="test-component"/>
	<hr/>
	<button class="btn btn-primary" @click="updateComponentMembers">Click To Update Component Members</button>
	<hr/>
	<h3>Ref array</h3>
	<hr/>
	<ul>
		<li v-for="num in 10" ref="items">Item {{ num }}</li>
	</ul>
	<p>Number of list items: {{ itemCount }}</p>
	<hr/>
</template>