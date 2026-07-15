import { ref, computed, readonly } from "vue";

export function useCounterStore() {
	const count = ref(0);
	const doubleCount = computed(() => count.value * 2);

	function increment() {
		count.value++;
	}

	return {
		count: readonly(count),
		doubleCount: readonly(doubleCount),
		increment
	};
}