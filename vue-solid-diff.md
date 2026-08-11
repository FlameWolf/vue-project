# Differences in How Vue and Solid Handle Non-Primitive Reactive Values

If you ever find yourself porting your front-end code from _Vue_ to _Solid_, or vice versa, here's one thing that might get you into deep trouble: they handle **non-primitive** reactive references (created using `ref` in _Vue_ and `createSignal` in _Solid_) in a completely different manner. To demonstrate, here is a _Vue_ component that contains a reactive array:

```vue
<script setup lang="ts">
	import { ref, watch } from "vue";

	const separator = ", ";
	const arrayRef = ref([1, 2, 3]); /* Keep an eye on this */
	const updated = ref<Date>();

	function updateArray() {
		const copy = arrayRef.value;
		copy.push(...copy.slice(-3).map(x => x + 3));
	}

	watch(
		arrayRef,
		() => {
			updated.value = new Date();
		},
		{ deep: true }
	);
</script>
<template>
	<h2>Reactive Array Behaviour Demo</h2>
	<p>The value of <code>arrayRef</code> is: {{ arrayRef.join(separator) }}</p>
	<button class="btn btn-primary" @click="updateArray">Update</button>
	<hr/>
	<template v-if="updated">
		<p><code>arrayRef</code> updated at: {{ updated.toISOString() }}</p>
		<hr/>
	</template>
</template>
```

What happens when you render this component in your app and click the **Update** button? The original reference (`arrayRef`) will be updated with each click, and the timestamp at the bottom will change. This happens because `arrayRef.value` is a reactive proxy of the source array. Therefore, `copy` points to the same reactive proxy, and calling `push()` on it is tracked by _Vue_'s reactivity system.

Here is the same code ported to _Solid_:

```tsx
import { createEffect, createSignal, on, Show } from "solid-js";
import type { JSX, VoidProps } from "solid-js";

export default function Dummy(props: VoidProps): JSX.Element {
	const separator = ", ";
	const [arraySig, setArraySig] = createSignal([1, 2, 3]); /* Keep an eye on this */
	const [updated, setUpdated] = createSignal<Date>();

	function updateArray() {
		const copy = arraySig();
		copy.push(...copy.slice(-3).map(x => x + 3));
	}

	createEffect(
		on(
			arraySig,
			() => {
				setUpdated(new Date());
			},
			{ defer: true }
		)
	);

	return (
		<>
			<h2>Reactive Array Behaviour Demo</h2>
			<p>The value of <code>arraySig</code> is: {arraySig().join(separator)}</p>
			<button class="btn btn-primary" onClick={updateArray}>Update</button>
			<hr/>
			<Show when={updated()} keyed={true}>
				{lastUpdated => (
					<>
						<p><code>arraySig</code> updated at: {lastUpdated.toISOString()}</p>
						<hr/>
					</>
				)}
			</Show>
		</>
	);
}
```

In this case, clicking **Update** mutates the array, but the UI does not update. `arraySig` returns the array currently stored in the signal to the variable `copy` inside the function `updateArray`. However, mutating that array directly does not notify _Solid_'s reactive system because `setArraySig` was not called. As a result, computations depending on `arraySig` are not rerun. Any subsequent calls to `arraySig` after `updateArray` will give you the updated array while the UI gives you absolutely no indication that the undelying array was updated. What fun!

(The behavior differs slightly with `createStore`. A signal created with `createSignal` can hold an ordinary mutable array, so direct mutation changes the stored array but does not notify the reactive system. A store, by contrast, exposes its state through `readonly` reactive proxies and is designed to be updated **only** through its store setter. Simply put, `createStore` won't let you modify `copy` directly, unlike `createSignal`.)

---

This difference impacts another important area besides UI updates: serialization. _Vue_ reactive objects are proxies, and such proxies cannot be directly structured-cloned. Consequently, passing a reactive proxy to APIs that use the structured clone algorithm, including **IndexedDB** operations, can result in a `DataCloneError`. (To make things worse, _Vue_'s `toRaw()` is shallow; it unwraps only the proxy passed directly to it. It does not recursively traverse an object and unwrap every nested reactive proxy. Consequently, if the argument itself is a plain object, `toRaw()` simply returns that object, even if it contains reactive proxies at deeper levels.)

## Summary

_Vue_ makes objects stored in a normal `ref()` deeply reactive. Reading `arrayRef.value` returns a reactive proxy, so mutating the array through methods such as `push()` is tracked.

_Solid_'s `createSignal()` does not deeply proxy the object stored in it. Reading `arraySig()` returns the stored array itself. Directly mutating that array changes the object, but it does not notify the signal's subscribers. To trigger reactive updates, the new value must be passed through the signal setter.