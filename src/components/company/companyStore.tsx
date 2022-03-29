import React, { useReducer } from 'react';
import { employeeReducer } from './employeeReducer';
import { departmentReducer } from './departmentReducer';
import { companyReducer } from './companyReducer';
import { Company } from '../../types/company';
import { Employee } from '../../types/employee';
import { Department } from '../../types/department';
import { combineReducers } from '../utils/combineReducers';

type Props = {
    children: React.ReactNode
};

/**
 * Enthält alle Daten die im Store abgelegt werden sollen. 
 */
export type CompanyContextType = {
    company?: Company,
    employees: Employee[],
    departments: Department[]
};

/**
 * Initial Belegung der Daten im Store.
 */
export const initialState: CompanyContextType = {
    employees: [],
    departments: []
};

/**
 * Context Erstellen.
 * Mit dem dispatch können dann Funktionen des reducers aufgerufen werden.
 */
export const CompanyContext = React.createContext<{
    // Der Typ des Context:
    state: CompanyContextType,
    dispatch: React.Dispatch<any>
    }>({
    // Der initiale Zustand des Context:
    state: initialState,
    dispatch: () => null
});

const mainReducer = combineReducers( initialState, companyReducer, employeeReducer, departmentReducer );

/**
 * Erstellt den Provider für den Store.
 * @param param0 Kind Elemente, diese können auf den Store zugreifen.
 * @returns Komponente
 */
export const CompanyStore = (props: Props) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return (
        <CompanyContext.Provider value={{state, dispatch}}>
          {props.children}
        </CompanyContext.Provider>
        );
};
