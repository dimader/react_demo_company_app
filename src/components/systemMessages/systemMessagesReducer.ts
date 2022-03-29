import { ErrorContextType } from './SystemMessagesProvider';
import { SystemMessage } from '../../types/systemMessage';

/**
 * Mögliche Aktionen
 */
enum Types {
    Add = 'SYSTEMMESSAGES/ADD',
    RemoveAll = 'SYSTEMMESSAGES/REMOVEALL',
};

type Action = |
    { type: Types.Add, info: SystemMessage } |
    { type: Types.RemoveAll }
    ;

export const systemMessagesReducer = (state: ErrorContextType, action: Action): ErrorContextType => {
    switch (action.type) {
        case Types.Add:
            return {
                ...state,
                error: action.info
            };
        case Types.RemoveAll:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const systemMessageDispatchActions = {
    add: (info: string, status: string = 'info') => {
        const message: SystemMessage = { error: info, status: status };
        return { type: Types.Add, info: message };
    },

    removeAll: () => {
        return { type: Types.RemoveAll }
    }
};