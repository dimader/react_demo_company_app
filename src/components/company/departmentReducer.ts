import { CompanyContextType } from './companyStore';
import { Department } from '../../types/department';

/**
 * Mögliche Aktionen
 */
enum Types {
    Add = 'DEPARTMENT/ADD',
    Update = 'DEPARTMENT/UPDATE',
    Delete = 'DEPARTMENT/DELETE'
};

type Action = |
    { type: Types.Add, department: Department } |
    { type: Types.Update, department: Department } |
    { type: Types.Delete, id: string }
    ;

export const departmentReducer = (state: CompanyContextType, action: Action): CompanyContextType => {
    switch (action.type) {
        case Types.Add:
            return {
                ...state,
                departments: [
                    ...state.departments,
                    action.department
                ]
            };
        case Types.Update:
            // Kopie des Arrays erstellen und die Kopie bearbeiten.
            const copy = [...state.departments];
            const index = copy.findIndex(element => element.id === action.department.id);
            // In diesem Fall tausche ich einfach das Objekt aus.
            copy[index] = action.department;

            return {
                ...state,
                departments: copy
            }
        case Types.Delete:
            // Array neu erstellen, ohne das betroffene Element
            return {
                ...state,
                departments: state.departments.filter(eachElement => eachElement.id !== action.id),
            };
        default:
            // unverändert zurückgeben
            return state;
    }
};

export const departmentDispatchActions = {
    add: (department: Department) => {
        return { type: Types.Add, department: department };
    },

    update: (department: Department) => {
        return { type: Types.Update, department: department };
    },

    delete: (id: string) => {
        return { type: Types.Delete, id: id };
    }
};