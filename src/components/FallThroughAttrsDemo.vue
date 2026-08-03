<script setup lang="ts">
import { useAttrs } from "vue";

defineOptions({
	inheritAttrs: false
});
const attrs = useAttrs();
</script>
<template>
	<div>
		<p>The outer <code>DIV</code> won't inherit the fall-through attributes.</p>
		<p>Fall-through attributes: {{ attrs }}</p>
		<hr/>
		<p>But the below button will.</p>
		<button class="btn" v-bind="attrs">Yes</button>
		<hr/>
	</div>
</template>