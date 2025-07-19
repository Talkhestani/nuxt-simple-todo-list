<script lang="ts" setup>
import type { FetchError } from "ofetch";

const route = useRoute();

const errorMessage = ref("");
const loading = ref(true);

const taskName = ref("");

const { data: task, error } = await useFetch(`/api/tasks/${route.params.id}`);

const onDelete = (taskId: number | undefined) => {
	try {
		loading.value = true;
		$fetch(`/api/tasks/${taskId}`, {
			method: "DELETE",
		});
		loading.value = false;
		navigateTo("/", { replace: true });
	}
	catch (e) {
		const error = e as FetchError;
		errorMessage.value = error.statusMessage || "";
		loading.value = false;
	}
};

const onUpdate = async (taskId: number | undefined) => {
	if (!taskName.value.trim()) {
		errorMessage.value = "Task is required.";
		return;
	}
	try {
		loading.value = true;
		await $fetch(`/api/tasks/${taskId}`, {
			method: "PATCH",
			body: {
				title: taskName.value,
			},
		});
		await refreshNuxtData();
		loading.value = false;
	}
	catch (e) {
		const error = e as FetchError;
		errorMessage.value = error.statusMessage || "";
		loading.value = false;
	}
};

loading.value = false;
</script>

<template>
	<div>
		<article
			v-if="loading"
			aria-busy="true"
		/>
		<article
			v-else-if="error"
			class="error"
		>
			{{ error.message }}
		</article>
		<article
			v-else
		>
			{{ task?.title }}
		</article>
		<form @submit.prevent="onUpdate(task?.id)">
			<input
				v-model="taskName"
				type="text"
				placeholder="new text for todo ..."
			>
			<button @click="onUpdated(task?.id)">
				Update
			</button>
		</form>
		<br>
		<div class="button-container">
			<button @click="onDelete(task?.id)">
				Delete
			</button>
		</div>
	</div>
</template>
