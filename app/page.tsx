
import { addEmployee } from "@/actions/employeeAction";
import { AddEmployeeForm } from "@/components/addEmployeeForm";
import { EmployeeList } from "@/components/employeeList";


export default function Home() {

  
  return (
    <div className="flex flex-col h-full w-full bg-red-50 items-center justify-center overflow-scroll gap-y-2">
      <div className="text-xl p-3 text-neutral-700">ADD EMPLOYEE</div>
      <AddEmployeeForm/> 
      <EmployeeList/>

    </div>
  );
}
