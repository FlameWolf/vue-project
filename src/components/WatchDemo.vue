<script setup lang="ts">
	import { ref, watch, watchEffect } from "vue";
	import { emptyString } from "@/constants/common";

	type GitCommit = {
		html_url: string;
		sha: string;
		author: {
			html_url: string;
			name: string;
			date: string;
		};
		commit: {
			message: string;
			author: {
				html_url: string;
				name: string;
				date: string;
			};
		};
	};

	const question = ref(emptyString);
	const answer = ref("Questions usually contain a question mark. ;-)");
	const loading = ref(false);
	const testPost = ref(emptyString);
	const testSync = ref(emptyString);
	const preWatchCount = ref(0);
	const syncWatchCount = ref(0);
	/* Begin: Variables for the GitHub example */
	const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`;
	const branches = ["main", "minor"];
	const currentBranch = ref(branches[0]);
	const commits = ref<GitCommit[]>([]);
	const showGitExample = ref(false);
	/* End: Variables for the GitHub example */

	function truncate(value: string) {
		const newline = value.indexOf("\n");
		return newline > 0 ? value.slice(0, newline) : value;
	}

	function formatDate(value: string) {
		return value.replace(/T|Z/g, " ");
	}

	function updateTestPost() {
		testPost.value = crypto.randomUUID();
	}

	function updateTestSync() {
		for (let index = 0; index < 10; index++) {
			testSync.value = crypto.randomUUID();
		}
	}

	watch(question, async (currVal, prevVal) => {
		if (currVal.endsWith("?")) {
			loading.value = true;
			answer.value = "Thinking...";
			try {
				const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
					mode: "cors"
				});
				answer.value = (await res.json()).body;
			} catch (err) {
				answer.value = `Error! Could not reach the API. Reason: <em>${(err as Error).message}</em>.`;
				question.value = prevVal;
			} finally {
				loading.value = false;
			}
		}
	});

	watch(testSync, () => preWatchCount.value++, {
		flush: "pre"
	});

	watch(testSync, () => syncWatchCount.value++, {
		flush: "sync"
	});

	watch(
		testPost,
		() => {
			const valueHolder = document.getElementById("test-post-val");
			if (valueHolder) {
				console.log("Updated value from PRE watch:", valueHolder.textContent, Date.now());
			}
		},
		{
			flush: "pre"
		}
	);

	watch(
		testPost,
		() => {
			const valueHolder = document.getElementById("test-post-val");
			if (valueHolder) {
				console.log("Updated value from POST watch:", valueHolder.textContent, Date.now());
			}
		},
		{
			flush: "post"
		}
	);

	/*
		This will fire on page load even when `showGitExample` is false
		since effect watchers have `{ immediate: true }` automatically
	*/
	watchEffect(async onCleanup => {
		if (!showGitExample.value) {
			return;
		}
		const controller = new AbortController();
		const url = `${API_URL}${currentBranch.value}`;
		commits.value = await (
			await fetch(url, {
				mode: "cors",
				signal: controller.signal,
				cache: "reload",
				priority: "low"
			})
		).json();
		onCleanup(() => {
			controller.abort();
		});
	});
</script>
<template>
	<p>Ask a Yes/No question:</p>
	<input v-model="question" :disabled="loading" />
	<p v-html="answer"></p>
	<hr />
	<h2>Post Watcher</h2>
	<button class="btn btn-primary" @click="updateTestPost">Click to update the value</button>
	<span id="test-post-val" class="ms-2">{{ testPost }}</span>
	<hr />
	<h2>Sync Watcher</h2>
	<button class="btn btn-primary" @click="updateTestSync">Click to update the value</button>
	<span id="test-sync-val" class="ms-2">{{ testSync }}</span>
	<span class="badge text-bg-secondary ms-2">Pre watch was fired {{ preWatchCount }} times</span>
	<span class="badge text-bg-secondary ms-2">Sync watch was fired {{ syncWatchCount }} times</span>
	<hr />
	<div v-if="showGitExample" class="git-example">
		<h2>Latest Vue Core Commits</h2>
		<template v-for="branch in branches">
			<label>
				<input type="radio" :value="branch" name="branch" v-model="currentBranch" />
				<span class="mx-2">{{ branch }}</span>
			</label>
		</template>
		<p>vuejs/core@{{ currentBranch }}</p>
		<ul v-if="commits.length > 0">
			<li v-for="{ html_url, sha, author, commit } in commits" :key="sha">
				<a :href="html_url" target="_blank" class="commit">{{ sha.slice(0, 7) }}</a>
				<span class="mx-2">-</span>
				<span class="message">{{ truncate(commit.message) }}</span>
				<br />
				<span class="mx-2">by</span>
				<span class="author">
					<a :href="author.html_url" target="_blank">{{ commit.author.name }}</a>
				</span>
				<span class="mx-2">at</span>
				<span class="date">{{ formatDate(commit.author.date) }}</span>
			</li>
		</ul>
	</div>
</template>