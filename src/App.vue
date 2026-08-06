<script setup lang="ts">
	import "@/styles.css";
	import { ref } from "vue";
	import { emptyString } from "@/constants/common";
	import Navbar from "@/components/Navbar.vue";
	import SlotDemo2 from "@/components/SlotDemo2.vue";
	import FallThroughAttrsDemo from "@/components/FallThroughAttrsDemo.vue";
	import VModelDemo from "@/components/VModelDemo.vue";
	import DynamicDemo from "@/components/DynamicDemo.vue";
	import SlotDemo from "@/components/SlotDemo.vue";
	import EventDemo from "@/components/EventDemo.vue";
	import PropsDemo2 from "@/components/PropsDemo2.vue";
	import PropsDemo from "@/components/PropsDemo.vue";
	import RefDemo from "@/components/RefDemo.vue";
	import WatchDemo from "@/components/WatchDemo.vue";
	import FormDemo from "@/components/FormDemo.vue";
	import ConfirmModal from "@/components/ConfirmModal.vue";
	import Dropdown from "@/components/Dropdown.vue";
	import ProvideDemo from "@/components/ProvideDemo.vue";
	import AsyncDemo from "@/components/AsyncDemo.vue";

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
	<Navbar class="mb-4"/>
	<AsyncDemo/>
	<ProvideDemo/>
	<Dropdown>
		<template #trigger-content>
			<button class="btn btn-primary dropdown-toggle">Click to toggle</button>
		</template>
		<template #dropdown-content>
			<div class="dropdown-menu show">
				<div class="dropdown-item">First item</div>
				<div class="dropdown-item">Second item</div>
				<div class="dropdown-item">Third item</div>
			</div>
		</template>
	</Dropdown>
	<hr/>
	<SlotDemo2>
		<p>This content will go into the default slot because no slot name is specified.</p>
		<template #secondary="secondaryProps">
			<p>Non-default content for the secondary alert.</p>
			<p>Moniker: {{ secondaryProps.moniker }}</p>
			<p>Age: {{ secondaryProps.age }}</p>
		</template>
		<template #success="successProps">
			<p>Non-default content for the success alert.</p>
			<p>Moniker: {{ successProps.moniker }}</p>
			<p>Age: {{ successProps.age }}</p>
		</template>
		<template #warning="warningProps">
			<template v-if="warningProps.num % 2 === 0">
				<p >This content is in a named slot inside a <code>v-for</code> loop.</p>
				<p>Non-default content for the warning alert.</p>
				<p>Num: {{ warningProps.num }}</p>
			</template>
		</template>
	</SlotDemo2>
	<FallThroughAttrsDemo class="btn-primary" name="target-button" type="button"/>
	<VModelDemo v-model.first.capitalise="demoProps"/>
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