import { Company } from '../../types/company';
import { CompanyContextType } from './companyStore';

/**
 * Mögliche Aktionen
 */
enum Types {
    Load = 'COMPANY/LOAD',
    Update = 'COMPANY/UPDATE'
};

type Action = |
    { type: Types.Load, company: Company } |
    { type: Types.Update, company: Company }
    ;

export const companyReducer = (state: CompanyContextType, action: Action): CompanyContextType => {
    switch (action.type) {
        case Types.Update:
            return {
                ...state,
                company: action.company
            }
        case Types.Load:
            // Neue Daten setzten, ggf. alte Daten überschreiben
            return {
                ...state,
                company: action.company
            };
        default:
            // unverändert zurückgeben
            return state;
    }
};

export const companyDispatchActions = {
    load: (company: Company) => {
        return { type: Types.Load, company: company };
    },

    update: (company: Company) => {
        return { type: Types.Update, company: company };
    }
};
