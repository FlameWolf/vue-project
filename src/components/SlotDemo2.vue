<script setup lang="ts">
import { useSlots } from "vue";

const slots = useSlots();
</script>
<template>
	<div class="alert alert-primary" role="alert">
		<!-- Implied `name="default"` -->
		<slot moniker="Alex" :age="25">This is a primary alert.</slot>
	</div>
	<div class="alert alert-secondary" role="alert">
		<slot name="secondary" moniker="Jane" :age="30">This is a secondary alert.</slot>
	</div>
	<div class="alert alert-info" role="alert">
		<slot name="info" moniker="John" :age="30">This is an info alert.</slot>
	</div>
	<div class="alert alert-success" role="alert">
		<slot name="success" moniker="Sam" :age="25">This is a success alert.</slot>
	</div>
	<hr/>
	<p v-if="!slots.info">No content was provided from the owner component for the <code>info</code> slot.</p>
	<hr/>
	<template v-for="num in 10">
		<div class="alert alert-warning" role="alert">
			<slot name="warning" :num="num">{{ num }}: This is a warning alert.</slot>
		</div>
	</template>
</template>