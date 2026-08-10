<script setup lang="ts">
	import { ref, type Directive, type DirectiveBinding, type VNode } from "vue";

	const vWarning: Directive = {
		mounted: (el: Element) => {
			el.classList.add("text-bg-warning");
		}
	};
	/*
		Directive hook parameters:
		--------------------------
		el: the element the directive is bound to. This can be used to directly manipulate the DOM.
		binding: an object containing the following properties.
			- value: The value passed to the directive. For example in v-my-directive="1 + 1", the value would be 2.
			- oldValue: The previous value, only available in beforeUpdate and updated. It is available whether or not the value has changed.
			- arg: The argument passed to the directive, if any. For example in v-my-directive:foo, the arg would be "foo".
			- modifiers: An object containing modifiers, if any. For example in v-my-directive.foo.bar, the modifiers object would be { foo: true, bar: true }.
			- instance: The instance of the component where the directive is used.
			- dir: the directive definition object.
		vNode: the underlying VNode representing the bound element.
		prevVnode: the VNode representing the bound element from the previous render. Only available in the beforeUpdate and updated hooks.
	*/
	const vSample: Directive = {
		// Called before bound element's attributes or event listeners are applied
		created(el: Element, binding, vNode) {
			handleDirectiveHook("created", el, binding, vNode);
		},
		// Called right before the element is inserted into the DOM
		beforeMount(el: Element, binding, vNode) {
			handleDirectiveHook("beforeMount", el, binding, vNode);
		},
		// Called when the bound element's parent component and all its children are mounted
		mounted(el: Element, binding, vNode) {
			handleDirectiveHook("mounted", el, binding, vNode);
		},
		// Called before the parent component is updated
		beforeUpdate(el, binding, vNode, prevVNode) {
			handleDirectiveHook("beforeUpdate", el, binding, vNode, prevVNode);
		},
		// Called after the parent component and all of its children have updated
		updated(el: Element, binding, vNode, prevVNode) {
			handleDirectiveHook("updated", el, binding, vNode, prevVNode);
		},
		// Called before the parent component is unmounted
		beforeUnmount(el: Element, binding, vNode) {
			handleDirectiveHook("beforeUnmount", el, binding, vNode);
		},
		// Called when the parent component is unmounted
		unmounted(el: Element, binding, vNode) {
			handleDirectiveHook("unmounted", el, binding, vNode);
		}
	};
	const argValue = ref(2);

	function handleDirectiveHook(event: string, el: Element, binding: DirectiveBinding, vNode: VNode, prevVNode?: VNode) {
		el.insertAdjacentHTML(
			"beforeend",
			`<p class="info">Event: ${event}</p>
			<ul class="list-group">
				<li class="list-group-item">Binding properties:</li>
				<li class="list-group-item">value: ${binding.value}</li>
				<li class="list-group-item">oldValue: ${binding.oldValue}</li>
				<li class="list-group-item">arg: ${binding.arg}</li>
				<li class="list-group-item">modifiers: ${JSON.stringify(binding.modifiers)}</li>
				<li class="list-group-item">instance: ${JSON.stringify(binding.instance)}</li>
				<li class="list-group-item">dir: ${JSON.stringify(binding.dir)}</li>
			</ul>
			<p>vNode: ${vNode}</p>
			<p>prevVNode: ${prevVNode}</p>
			<hr/>`
		);
	}
</script>

<template>
	<p>Trying to use the <code>v-warning</code> directive on <span v-warning>this text</span>.</p>
	<hr/>
	<p v-sample:arg.mod1.mod2="argValue">Testing the <code>v-sample</code> directive.</p>
	<button class="btn btn-primary" @click="argValue = Math.round(Math.random() * 100)">Click to Change</button>
</template>