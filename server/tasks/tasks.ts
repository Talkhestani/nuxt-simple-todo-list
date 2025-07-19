export default defineTask({
	meta: {
		name: "db:tasks",
		description: "Run database seed task",
	},
	async run() {
		console.log("Running DB seed task...");
		const tasks = [
			{
				title: "learn nuxt",
				done: false,
			},
			{
				title: "learn vue",
				done: false,
			},
		];
		await useDrizzle().insert(tables.tasks).values(tasks);
		return { result: "success" };
	},
});
