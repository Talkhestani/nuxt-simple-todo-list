import { z } from "zod";
import { tasks } from "~~/server/database/schema";

const IdParamsSchema = z.object({
	id: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
	const result = await getValidatedRouterParams(event, IdParamsSchema.safeParse);

	if (!result.success) {
		return sendError(event, createError({
			statusCode: 422,
			statusMessage: "invalid id",
		}));
	}

	const task = (await useDrizzle().select().from(tasks)).find(t => t.id === result.data.id);

	if (!task) {
		return sendError(event, createError({
			statusCode: 404,
			statusMessage: "task not found !",
		}));
	}

	return task;
});
