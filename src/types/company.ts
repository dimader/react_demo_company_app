import { TFunction } from 'react-i18next';
import { isEmpty, isInLength } from '../components/utils/validationUtils';

/**
 * Type für Unternehmen.
 */
export type Company = {
    id?: string,
    name: string,
    ort: string,
    info?: string,
};

/**
 * Führt eine Validierung des übergebenen Objekts durch. 
 * 
 * @param data Zu validierende Daten.
 * @param t i18n Funktion
 * @returns Map mit Validierungsfehlern.
 */
export const validate = (data: Company | undefined, t: TFunction<"translation", undefined>): Map<string, string> => {

    let errors = new Map<string, string>();

    if (!data) {
        errors.set('name', t('form.empty'));
        return errors;
    }

    if (isEmpty(data.name)) {
        errors.set('name', t('form.fieldEmpty'));
    }
    if (isEmpty(data.info)) {
        errors.set('info', t('form.fieldEmpty'));
    }
    if (isEmpty(data.ort)) {
        errors.set('ort', t('form.fieldEmpty'));
    }

    if (data.name && !isInLength(data.name, 3, 25)) {
        errors.set('name', t('form.fieldLength'));
    }
    if (data.info && !isInLength(data.info as string, 3, 25)) {
        errors.set('info', t('form.fieldLength'));
    }
    if (data.ort && !isInLength(data.ort, 3, 25)) {
        errors.set('ort', t('form.fieldLength'));
    }

    return errors;
};
