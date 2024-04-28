import { getEmployee } from "@/db/queries"
import { EmployeeItem } from "./employeeItem";


export const EmployeeList = async() => {

    const EmployeeData = getEmployee();

    const [
        Employee,
      ] = await Promise.all([
        EmployeeData,
      ]);
    return(
        <div className="flex flex-col gap-y-2">
            {Employee.map((data) => (
                
                <EmployeeItem
                    key={data.id} 
                    id={data.id || undefined}
                    name={data.name || undefined}
                    salary={data.salary || undefined}
                    />
            
            ))}
        </div>
    )
}
