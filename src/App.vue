<script setup lang="ts">
	import "@/styles.css";
	import { ref } from "vue";
	import { emptyString } from "@/constants/common";
	import Navbar from "@/components/Navbar.vue";
	import EventDemo from "@/components/EventDemo.vue";
	import PropsDemo from "@/components/PropsDemo.vue";
	import RefDemo from "@/components/RefDemo.vue";
	import WatchDemo from "@/components/WatchDemo.vue";
	import FormDemo from "@/components/FormDemo.vue";
	import ConfirmModal from "@/components/ConfirmModal.vue";

	const age = ref(25);
	const ageChangeMessage = ref(emptyString);
	function onAgeIncrease(step: number) {
		age.value += step;
		ageChangeMessage.value = `Age increased: new age: ${age.value}`;
	}
	function onAgeDecrease(step: number) {
		age.value -= step;
		ageChangeMessage.value = `Age decreased: new age: ${age.value}`;
	}
</script>
<template>
	<Navbar/>
	<EventDemo name="Iris" :age greeting="Hello" :age-step="2" @increase-age="onAgeIncrease" @decrease-age="onAgeDecrease"/>
	<p>{{ ageChangeMessage }}</p>
	<PropsDemo name="Jane" :age="20" greeting="Hello"/>
	<RefDemo/>
	<WatchDemo/>
	<FormDemo/>
	<ConfirmModal/>
</template>