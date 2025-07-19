<template>
	<nav class="container">
		<ul>
			<li>
				<nuxt-link to="/">
					<strong>Tasks App</strong>
				</nuxt-link>
			</li>
		</ul>
		<ul>
			<li><nuxt-link :to="{ name: 'create' }">Create Task</nuxt-link></li>
		</ul>
	</nav>
</template>
