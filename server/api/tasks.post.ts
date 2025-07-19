import { createTaskSchema, tasks } from "../database/schema";

export default defineEventHandler(async (event) => {
	const result = await readValidatedBody(event, createTaskSchema.safeParse);
	if (!result.success) {
		return sendError(event, createError({
			statusCode: 422,
			statusMessage: "invalid task",
		}));
	}

	const task = useDrizzle().insert(tasks).values(result.data).returning().get();

	return task;
});
