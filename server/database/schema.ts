import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const tasks = sqliteTable("tasks", {
	id: integer("id").primaryKey({ autoIncrement: true }).unique(),
	title: text("title").notNull(),
	done: integer("done", { mode: "boolean" }).default(false),
});

export const createTaskSchema = createInsertSchema(tasks, {
	title: field => field.min(1).max(500),
}).omit({
	id: true,
});

export const PatchTasksSchema = createTaskSchema.partial();
