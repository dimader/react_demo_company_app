import { useContext } from 'react';
import { companyDispatchActions } from './companyReducer';
import { employeeDispatchActions } from './employeeReducer';
import { departmentDispatchActions } from './departmentReducer';
import { CompanyContext } from './companyStore';
import { v4 as uuid } from 'uuid';
import { Company } from '../../types/company';
import { Employee } from '../../types/employee';
import { Department } from '../../types/department';

export default useCompanyStore;

const initialCompany: Company = {
    id: 'b8ae8182-52c2-4f93-9a55-4842bb6610b6',
    name: 'Firmenname',
    ort: 'Deutschlands Mitte',
    info: 'Unternehmensinfos'
};
const initialDepartment1: Department = {
    id: 'b8ae8182-52c2-4f93-9a55-4842bb6610b7',
    name: 'Abteilung 1',
    ort: 'Ort 1',
    info: 'Info 1'
};
const initialDepartment2: Department = {
    id: 'b8ae8182-52c2-4f93-9a55-4842bb6610b8',
    name: 'Abteilung 2',
    ort: 'Ort 2',
    info: 'Info 2'
};

function useCompanyStore() {
    const { state, dispatch } = useContext(CompanyContext);

    return {
        load: (): void => {
            // Initiale Daten erstellen:
            // Company
            dispatch(companyDispatchActions.load(initialCompany));
            // Abteilungen
            dispatch(departmentDispatchActions.add(initialDepartment1));
            dispatch(departmentDispatchActions.add(initialDepartment2));
        },

        // Company

        getCompany: (): Company | undefined => {
            // Wir haben immer nur genau eine Company
            return state.company;
        },

        updateCompany: (company: Company): void => {
            // Company kann nicht neu angelegt werden, hier also nur update
            dispatch(companyDispatchActions.update(company));
        },

        // Employee

        getAllEmployees: (): Employee[] => {
            return state.employees;
        },

        getEmployee: (id: string): Employee | undefined => {
            let data = state.employees.filter(each => each.id === id)[0]; // hier gehen wir davon aus das wir die daten immer finden
            return data;
        },

        addEmployee: (employee: Employee): void => {
            if (employee.id) {
                dispatch(employeeDispatchActions.update(employee));
            } else {
                employee.id = uuid(); // neue UUID erzeugen
                dispatch(employeeDispatchActions.add(employee));
            }
        },
        deleteEmployee: (id: string): void => {
            dispatch(employeeDispatchActions.delete(id));
        },

        // Department

        getAllDepartments: (): Department[] => {
            return state.departments;
        },

        getDepartment: (id: string): Department | undefined => {
            let data = state.departments.filter(each => each.id === id)[0]; // hier gehen wir davon aus das wir die daten immer finden
            return data;
        },

        addDepartment: (department: Department): void => {
            if (department.id) {
                dispatch(departmentDispatchActions.update(department));
            } else {
                department.id = uuid(); // neue UUID erzeugen
                dispatch(departmentDispatchActions.add(department));
            }
        },
        deleteDepartment: (id: string): void => {
            dispatch(departmentDispatchActions.delete(id));
        }
    };
};
