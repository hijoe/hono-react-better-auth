import { db } from "./db";
import { todos } from "./schema";
import { desc } from "drizzle-orm";

export const getTodos = async () => {
  return await db.select().from(todos).orderBy(desc(todos.createdAt));
};
