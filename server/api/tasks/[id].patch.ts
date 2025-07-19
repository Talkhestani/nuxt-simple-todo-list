import { z } from "zod";
import { PatchTasksSchema, tasks } from "~~/server/database/schema";

const IdParamsSchema = z.object({
	id: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
	const result = await getValidatedRouterParams(event, IdParamsSchema.safeParse);
	const body = await readValidatedBody(event, PatchTasksSchema.safeParse);

	if (!result.success) {
		sendError(event, createError({
			statusCode: 422,
			statusMessage: "invalid id",
		}));
	}
	const task = (await useDrizzle().select().from(tasks)).find(t => t.id === result.data?.id);

	if (!task) {
		return sendError(event, createError({
			statusCode: 404,
			statusMessage: "task not found !",
		}));
	}

	const updatedTask = useDrizzle().update(tasks).set({
		title: body.data?.title,
	}).where(eq(tables.tasks.id, result.data!.id)).returning().get();

	return updatedTask;
});
