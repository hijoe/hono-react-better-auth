import { db } from "./db";
import { todos } from "./schema";
import { desc, eq } from "drizzle-orm";

export const getTodosByUserId = async (userId: string) => {
  return await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(desc(todos.createdAt));
};
