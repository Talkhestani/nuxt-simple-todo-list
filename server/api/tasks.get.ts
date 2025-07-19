import { tables, useDrizzle } from "../utils/drizzle";

export default defineEventHandler(async () => {
	// return sendError(event, createError({
	//     statusCode: 500,
	//     statusMessage: 'Oh no!'
	// }))
	const tasks = await useDrizzle().select().from(tables.tasks).all();

	return tasks;
});
