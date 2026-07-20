<script setup lang="ts">
	import "@/styles.css";
	import Navbar from "@/components/Navbar.vue";
	import PropsDemo from "@/components/PropsDemo.vue";
	import RefDemo from "@/components/RefDemo.vue";
	import WatchDemo from "@/components/WatchDemo.vue";
	import FormDemo from "@/components/FormDemo.vue";
	import ConfirmModal from "@/components/ConfirmModal.vue";
</script>
<template>
	<Navbar/>
	<PropsDemo name="Jane" :age="20" greeting="Hello"/>
	<RefDemo/>
	<WatchDemo/>
	<FormDemo/>
	<ConfirmModal/>
</template>