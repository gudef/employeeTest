"use server";
import { cache } from "react";
import db from "./drizzle";




export const getEmployee = async () => {
 
    const data = await db.query.employee.findMany({

    })

    return data;
    
}; 


