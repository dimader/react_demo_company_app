import { useContext } from 'react';
import { SystemMessage } from '../../types/systemMessage';
import { ErrorContext } from './SystemMessagesProvider';
import { systemMessageDispatchActions } from './systemMessagesReducer';

function _useErrorMessage() {
    return useContext(ErrorContext);
};

/**
 * Service Interface.
 */
export type InfoMessageServiceInterface = {
    showInfoMessage: (info: string) => void,
    showErrorMessage: (error: string) => void,
    clearMessages: () => void,
    getMessage: () => SystemMessage | null,
    handleNotImplemented: (info: string) => void,
    handleNetworkException: (error: Error) => void
};

/**
 * Service Funktionen zum Darstellen von Meldungen.
 * @returns Service
 */
function useInfoMessageHandling(): InfoMessageServiceInterface {
    const { state, dispatch } = _useErrorMessage();

    return {
        showInfoMessage: (info: string): void => {
            dispatch(systemMessageDispatchActions.add(info));

            setTimeout(() => {
                dispatch(systemMessageDispatchActions.removeAll());
              }
              , 4000);
        },

        showErrorMessage: (error: string): void => {
            dispatch(systemMessageDispatchActions.add(error, 'error'));

            setTimeout(() => {
                dispatch(systemMessageDispatchActions.removeAll());
              }
              , 4000);
        },

        clearMessages: (): void => {
            dispatch(systemMessageDispatchActions.removeAll());
        },

        getMessage: (): SystemMessage | null => {
            return state.error;
        },

        handleNotImplemented: (info: string): void => {
            dispatch(systemMessageDispatchActions.add('Not implemented ' + info, 'error'));
        },
        handleNetworkException: (error: Error): void => {
            dispatch(systemMessageDispatchActions.add('Failed: Networking Error. Details: ' + error.message, 'error'));
        }
    };
};

export default useInfoMessageHandling;
