import { CompanyContextType } from './companyStore';
import { Employee } from '../../types/employee';

/**
 * Mögliche Aktionen
 */
enum Types {
    Load = 'EMPLOYEE/LOAD',
    Delete = 'EMPLOYEE/DELETE',
    Add = 'EMPLOYEE/ADD',
    Update = 'EMPLOYEE/UPDATE'
};

type Action = |
    { type: Types.Load, data: Employee[] } |
    { type: Types.Delete, id: string } |
    { type: Types.Add, employee: Employee } |
    { type: Types.Update, employee: Employee }
    ;

export const employeeReducer = (state: CompanyContextType, action: Action): CompanyContextType => {
    switch (action.type) {
        case Types.Add:
            return {
                ...state,
                employees: [
                    ...state.employees,
                    action.employee
                ]
            };

        case Types.Update:
            // Kopie des Arrays erstellen und die Kopie bearbeiten.
            const copy = [...state.employees];
            const index = copy.findIndex(element => element.id === action.employee.id);
            // In diesem Fall tausche ich einfach das Objekt aus.
            copy[index] = action.employee;

            return {
                ...state,
                employees: copy
            }

        case Types.Delete:
            // Array neu erstellen, ohne das betroffene Element
            return {
                ...state,
                employees: state.employees.filter(eachElement => eachElement.id !== action.id),
            };
        default:
            // unverändert zurückgeben
            return state;
    }
};

export const employeeDispatchActions = {
    add: (employee: Employee) => {
        return { type: Types.Add, employee: employee };
    },

    update: (employee: Employee) => {
        return { type: Types.Update, employee: employee };
    },

    delete: (id: string) => {
        return { type: Types.Delete, id: id };
    }
};