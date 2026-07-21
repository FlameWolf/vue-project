<script setup lang="ts">
	import "@/styles.css";
	import { ref } from "vue";
	import { emptyString } from "@/constants/common";
	import Navbar from "@/components/Navbar.vue";
	import DynamicDemo from "@/components/DynamicDemo.vue";
	import SlotDemo from "@/components/SlotDemo.vue";
	import EventDemo from "@/components/EventDemo.vue";
	import PropsDemo2 from "@/components/PropsDemo2.vue";
	import PropsDemo from "@/components/PropsDemo.vue";
	import RefDemo from "@/components/RefDemo.vue";
	import WatchDemo from "@/components/WatchDemo.vue";
	import FormDemo from "@/components/FormDemo.vue";
	import ConfirmModal from "@/components/ConfirmModal.vue";

	const age = ref(25);
	const ageChangeMessage = ref(emptyString);
	const currentDate = ref(new Date());
	const demoProps = ref({
		name: "Xena",
		age: 25,
		greeting: "здравей",
		title: "Warrior"
	});

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
	<RegistrationDemo/>
	<DynamicDemo/>
	<SlotDemo>
		<p>This content is displayed inside the slot.</p>
		<hr/>
		<p>The date now is {{ currentDate.toISOString() }}</p>
		<hr/>
		<button class="btn btn-primary" @click="currentDate = new Date()">Click</button>
		<hr/>
		<p>End of slot content.</p>
	</SlotDemo>
	<EventDemo name="Iris" :age greeting="Hello" :age-step="2" @increase-age="onAgeIncrease" @decrease-age="onAgeDecrease"/>
	<p>{{ ageChangeMessage }}</p>
	<PropsDemo2 v-bind="demoProps"/>
	<button class="btn btn-primary" @click="demoProps.age -= 10">Click to decrease age</button>
	<hr/>
	<PropsDemo name="Jane" :age="20" greeting="Hello"/>
	<hr/>
	<PropsDemo v-bind="demoProps"/>
	<button class="btn btn-primary" @click="demoProps.age = Math.round(Math.random() * 100)">Click to change age</button>
	<hr/>
	<RefDemo/>
	<WatchDemo/>
	<FormDemo/>
	<ConfirmModal/>
</template>