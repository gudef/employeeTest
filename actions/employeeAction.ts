"use server";

import * as schema from "@/db/schema";
import { uuid } from 'uuidv4';
import db from "@/db/drizzle";
import { EmployeeEditSchema, EmployeeSchema } from "./employeeSchema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";



export const addEmployee = async (values: z.infer<typeof EmployeeSchema>) => {

    const id = uuid();

    try {

        await db.insert(schema.employee).values({
            id: id,
            name: values.name,
            salary: values.salary,
        });
        revalidatePath("/");
        return { success: "success" };

    } catch (error) {
        return { error: error }
    }

}

export const deleteEmployee = async (id: string | undefined) => {

    if(id === undefined){
        return {error: "undefined"};
    }


    try{
        await db.delete(schema.employee).where(eq(schema.employee.id,id));
        revalidatePath("/");
        return {success: "delete success"};
    }catch (error){
        return {error: error}
    }

}

export const editEmployee = async(values: z.infer<typeof EmployeeEditSchema>) => {

    try {

        await db.update(schema.employee)
        .set({ name: values.name,
               salary: values.salary
            })
        .where(eq(schema.employee.id, values.id))
        
        revalidatePath("/");
        return { success: "success" };

    } catch (error) {
        return { error: error }
    }
    
    
}


