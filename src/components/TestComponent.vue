<script setup lang="ts">
import { ref } from "vue";
import { emptyString } from "@/constants/common";

type Func = (...args: unknown[]) => unknown;

const stringRef = ref(emptyString);
const numRef = ref(0);
const funcRef = ref<Func>(() => void 0);

defineExpose({
	stringRef,
	numRef,
	funcRef
});
</script>
<template>
	<h2>Component with exposed members</h2>
	<p>The value of <code>stringRef</code> set from the parent/owner component is: {{ stringRef }}</p>
	<p>The value of <code>numRef</code> set from the parent component is: {{ numRef }}</p>
	<p>The value of <code>funcRef</code> set from the parent component is: {{ funcRef }}</p>
	<button class="btn btn-primary" @click="funcRef">Invoke Function</button>
</template>