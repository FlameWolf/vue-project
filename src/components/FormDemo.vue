<script setup lang="ts">
	import { emptyString } from "@/constants/common";
	import { ref } from "vue";

	enum YesNo {
		Yes = "Yes",
		No = "No"
	}

	const text1 = ref(emptyString);
	const check1 = ref(false);
	const check2 = ref(YesNo.No);
	const checkArr1 = ref([]);
	const radio1 = ref();
	const select1 = ref();
	const select2 = ref();
</script>
<template>
	<h3>Form Input Binding Demo</h3>
	<hr/>
	<h4>V-Model</h4>
	<input type="text" v-model="text1" placeholder="Type something"/>
	<br/>
	<span>The updated value is: {{ text1 }}</span>
	<hr/>
	<h4>Checkbox</h4>
	<label>
		<input type="checkbox" v-model="check1"/>
		<span class="ms-2">{{ check1 }}</span>
	</label>
	<hr/>
	<h4>Multiple checkboxes</h4>
	<input type="checkbox" value="First" v-model="checkArr1"/>
	<br/>
	<input type="checkbox" value="Second" v-model="checkArr1"/>
	<br/>
	<input type="checkbox" value="Third" v-model="checkArr1"/>
	<br/>
	<label>Selected: {{ checkArr1 }}</label>
	<hr/>
	<h4>Radio buttons</h4>
	<label>
		<input type="radio" :value="undefined" v-model="radio1"/>
		<span class="ms-2">None</span>
	</label>
	<br/>
	<label>
		<input type="radio" value="First" v-model="radio1"/>
		<span class="ms-2">First</span>
	</label>
	<br/>
	<label>
		<input type="radio" value="Second" v-model="radio1"/>
		<span class="ms-2">Second</span>
	</label>
	<br/>
	<label>
		<input type="radio" value="Third" v-model="radio1"/>
		<span class="ms-2">Third</span>
	</label>
	<br/>
	<label>Selected: {{ radio1 }}</label>
	<hr/>
	<h4>Select</h4>
	<p>Selected: {{ select1 }}</p>
	<select v-model="select1">
		<option :value="undefined">Select Any</option>
		<option value="First">One</option>
		<option value="Second">Two</option>
		<option value="Third">three</option>
	</select>
	<hr/>
	<h4>Multi-select</h4>
	<p>Selected: {{ select2 }}</p>
	<select v-model="select2" multiple="true">
		<option :value="undefined">None</option>
		<option value="First">One</option>
		<option value="Second">Two</option>
		<option value="Third">three</option>
	</select>
	<hr/>
	<h4>Checkbox with custom labels</h4>
	<label>
		<input type="checkbox" v-model="check2" :true-value="YesNo.Yes" :false-value="YesNo.No"/>
		<span class="ms-2">{{ check2 }}</span>
	</label>
</template>