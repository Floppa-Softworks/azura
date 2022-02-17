import { z } from "zod";

export const fieldSchema = z.string().min(1).max(256);
export const titleSchema = fieldSchema.nullable();
export const timestampSchema = z.date();
