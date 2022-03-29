import React, { useReducer } from 'react';
import { SystemMessage } from '../../types/systemMessage';
import { systemMessagesReducer } from './systemMessagesReducer';

export type ErrorContextType = {
    error: SystemMessage | null
};

export const initialState: ErrorContextType = {
    error: null
}

type Props = {
    children: React.ReactNode
};

export const ErrorContext = React.createContext<{
    state: ErrorContextType,
    dispatch: React.Dispatch<any>
}>({
    state: initialState,
    dispatch: () => null
});

export const ErrorProvider = (props: Props) => {
    const [state, dispatch] = useReducer(systemMessagesReducer, initialState);

    return (
        <ErrorContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ErrorContext.Provider>
    );
};
