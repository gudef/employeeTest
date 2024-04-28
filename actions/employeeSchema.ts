import { z } from "zod";

export const EmployeeSchema = z.object({
    name: z.string().min(3, { message: "Title is too short." }),
    salary: z.string().transform((v) => Number(v) || 0),
});

export const EmployeeEditSchema = z.object({
    id: z.string(),
    name: z.string().min(3, { message: "Title is too short." }),
    salary: z.string().transform((v) => Number(v) || 0),
});

