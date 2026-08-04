<script setup lang="ts">
import { useSlots } from "vue";

const slots = useSlots();
</script>
<template>
	<div class="alert alert-primary" role="alert">
		<!-- Implied `name="default"` -->
		<slot>This is a primary alert.</slot>
	</div>
	<div class="alert alert-secondary" role="alert">
		<slot name="secondary">This is a secondary alert.</slot>
	</div>
	<div class="alert alert-info" role="alert">
		<slot name="info">This is an info alert.</slot>
	</div>
	<div class="alert alert-success" role="alert">
		<slot name="success">This is a success alert.</slot>
	</div>
	<hr/>
	<p v-if="!slots.info">No content was provided from the owner component for the <code>info</code> slot.</p>
	<hr/>
</template>