<script lang="ts" setup>
const route = useRoute();

const loading = ref(true);

const { data: task, error } = await useFetch(`/api/tasks/${route.params.id}`);

loading.value = false;
</script>

<template>
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
</template>
