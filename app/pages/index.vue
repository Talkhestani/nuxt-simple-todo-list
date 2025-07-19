<script setup lang="ts">
const { data: tasks, error, status } = await useFetch("/api/tasks", {
	lazy: true,
});
</script>

<template>
	<article
		v-if="status === 'pending'"
		aria-busy="true"
	/>

	<article
		v-else-if="status === 'error'"
		class="error"
	>
		{{ error?.statusMessage }}
	</article>
	<div v-else>
		<article
			v-for="task in tasks"
			:key="task.id"
		>
			<nuxt-link :to="{ name: 'tasks-id', params: { id: task.id } }">
				{{ task.title }}
			</nuxt-link>
		</article>
	</div>
</template>
