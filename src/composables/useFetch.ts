import { ref, toRef, toValue, watch, type MaybeRefOrGetter } from "vue";

export function useFetch(url: MaybeRefOrGetter<string>, init?: RequestInit) {
	const data = ref<Record<keyof any, any> | null>(null);
	const error = ref<Error | null>(null);

	function fetchData() {
		const resolvedUrl = toValue(url);
		if(!resolvedUrl) {
			return;
		}
		fetch(resolvedUrl, init)
			.then(response => {
				if (!response.ok) {
					error.value = new Error(`Error fetching data. Status: ${response.status}`);
				}
				return response.json();
			})
			.then(json => {
				data.value = json;
			})
			.catch(err => {
				error.value = err;
			});
	}

	watch(toRef(url), fetchData, { immediate: true });

	return {
		data,
		error
	};
}