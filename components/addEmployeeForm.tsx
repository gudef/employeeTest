"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmployeeSchema} from "@/actions/employeeSchema";
import { addEmployee } from "@/actions/employeeAction";
import { useTransition } from "react";

export const AddEmployeeForm = () => {


    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof EmployeeSchema>>({
        resolver: zodResolver(EmployeeSchema),
        defaultValues: {
          name: "",
          salary: 0,
        },
      });

      const onSubmit = (values: z.infer<typeof EmployeeSchema>) =>{

        startTransition(() => {
            addEmployee(values)
            .then((success) => {
                console.log(success);
            })
            .then((error) => {
                console.log(error);
            })

            form.reset({ name: "", salary: 0 });
        });
    }
    return (
        <div className="h-15 w-[350px] bg-green-100 p-3 border-2 border-green-300">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    disabled={isPending}
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter your name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    disabled={isPending}
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Salary</FormLabel>
                            <FormControl>
                                <Input placeholder="Salary" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Enter your salary.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <Button type="submit" disabled={isPending}>Submit</Button>
            </form>
        </Form>
        </div>
    )
}