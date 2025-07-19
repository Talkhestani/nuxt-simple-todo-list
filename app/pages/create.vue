<script lang="ts" setup>
import type { FetchError } from "ofetch";

const errorMessage = ref("");
const loading = ref(false);

const taskName = ref("");

async function onSubmit() {
	if (!taskName.value.trim()) {
		errorMessage.value = "Task is required.";
		return;
	}

	try {
		loading.value = true;
		const result = await $fetch("/api/tasks", {
			method: "POST",
			body: {
				title: taskName.value,
			},
		});

		taskName.value = "";

		navigateTo({
			name: "tasks-id",
			params: {
				id: result.id,
			},
		});
	}
	catch (e) {
		const error = e as FetchError;
		errorMessage.value = error.statusMessage || "Unknown error occurred";
	}
	loading.value = false;
}
</script>

<template>
	<div>
		<article
			v-if="loading"
			aria-busy="true"
		/>
		<article
			v-else-if="errorMessage"
			class="error"
		>
			{{ errorMessage }}
		</article>

		<form
			@submit.prevent="onSubmit"
		>
			<label>
				Task
				<input
					v-model="taskName"
					type="title"
				>
			</label>
			<div class="button-container">
				<button>Create</button>
			</div>
		</form>
	</div>
</template>
