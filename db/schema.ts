import {integer, pgTable, serial, text } from "drizzle-orm/pg-core";


export const employee = pgTable('employee', {
    id: text("id").primaryKey(),
    name: text("name"),
    salary: integer("salary"),
  });