"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { deleteEmployee, editEmployee } from "@/actions/employeeAction"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { EmployeeEditSchema } from "@/actions/employeeSchema";
import { useTransition } from "react";


type Props = {
    id: string | undefined,
    name: string | undefined,
    salary: number | undefined,
}

export const EmployeeItem = ({
    id,
    name,
    salary
}: Props) => {

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EmployeeEditSchema>>({
    resolver: zodResolver(EmployeeEditSchema),
    defaultValues: {
      id: id,
      name: name,
      salary: salary,
    },
  });

    const onDeleteClick = (id: string | undefined) =>{
    
      startTransition(() => {
        deleteEmployee(id);
      });
    }

    const onSubmit = (values: z.infer<typeof EmployeeEditSchema>) =>{

      startTransition(() => {
        editEmployee(values)
        .then((success) => {
            console.log(success);
        })
        .then((error) => {
            console.log(error);
        })
      });

}
    return(
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Employee</CardTitle>
        <CardDescription>This is our employee data.</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                    disabled={isPending}
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} className="hidden"/>
                            </FormControl>
                        </FormItem>
                    )}
                    />
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
                <Button type="submit" disabled={isPending} className="w-full">Edit</Button>
            </form>
          </Form>
      </CardContent>
      <CardFooter className="w-full items-center">
        <Button variant="destructive" disabled={isPending} size="lg" onClick={() => onDeleteClick(id)} className="w-full">Delete</Button>
      </CardFooter>
    </Card>
    )
}