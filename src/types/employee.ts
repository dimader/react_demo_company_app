import { Department } from "./department";
import { TFunction } from 'react-i18next';
import { isEmpty, isInLength } from '../components/utils/validationUtils';

/**
 * Type für Mitarbeiter.
 */
export type Employee = {
    id?: string,
    name: string,
    position: EmployeeRoleEnum,
    birthdate: Date,
    info?: string,
    department?: Department,
};

export enum EmployeeRoleEnum {
    Dev = 'dev',
    DevOp = 'devOp',
    Engineer = 'engineer',
    Chef = 'chef',
    Ceo = 'ceo'
};

/**
 * Führt eine Validierung des übergebenen Objekts durch. 
 * 
 * @param data Zu validierende Daten.
 * @param t i18n Funktion
 * @returns Map mit Validierungsfehlern.
 */
export const validate = (data: Employee | undefined, t: TFunction<"translation", undefined>): Map<string, string> => {

    let errors = new Map<string, string>();

    if (!data) {
        errors.set('name', t('form.empty'));
        return errors;
    }

    if (isEmpty(data.name)) {
        errors.set('name', t('form.fieldEmpty'));
    }
    if (!data.position) {
        errors.set('position', t('form.fieldEmpty'));
    }
    if (!data.birthdate) {
        errors.set('birthdate', t('form.fieldEmpty'));
    }
    if (!data.department) {
        errors.set('department', t('form.fieldEmpty'));
    }
    
    if (data.name && !isInLength(data.name, 1, 25)) {
        errors.set('name', t('form.fieldLength'));
    }
    if (data.info && !isInLength(data.info as string, 1, 25)) {
        errors.set('info', t('form.fieldLength'));
    }
    
    return errors;
};
