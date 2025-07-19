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

	const deletedTask = useDrizzle().delete(tasks).where(eq(tables.tasks.id, Number(result.data.id))).returning().get();
	if (!deletedTask) {
		throw createError({
			statusCode: 404,
			message: "Todo not found",
		});
	}
	return deletedTask;
});
