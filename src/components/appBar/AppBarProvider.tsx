import React, { useReducer } from 'react';

export type AppBarContextType = {
    onSave?: () => void,
    onDelete?: () => void,
    onRefresh?: () => void,
    title?: string
};

export const initialState: AppBarContextType = {
};

type Props = {
    children: React.ReactNode
};

export const AppBarContext = React.createContext<{
    state: AppBarContextType,
    dispatch: React.Dispatch<any>
}>({
    state: initialState,
    dispatch: () => null
});

export const AppBarProvider = (props: Props) => {
    const [state, dispatch] = useReducer(appBarReducer, initialState);

    return (
        <AppBarContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AppBarContext.Provider>
    );
};

export enum Types {
    SetTitle = 'APPBAR/SetTitle',
    OnSave = 'APPBAR/OnSave',
    OnDelete = 'APPBAR/OnDelete',
    OnRefresh = 'APPBAR/OnRefresh'
};

type Action = |
    { type: Types.SetTitle, title: string } |
    { type: Types.OnSave, action: () => void | undefined } |
    { type: Types.OnDelete, action: () => void | undefined } |
    { type: Types.OnRefresh, action: () => void | undefined }
    ;

export const appBarReducer = (state: AppBarContextType, action: Action): AppBarContextType => {
    switch(action.type) {
        case Types.SetTitle:
            return {
                ...state,
                title: action.title
            };
        case Types.OnSave:
            return {
                ...state,
                onSave: action.action
            };
        case Types.OnDelete:
            return {
                ...state,
                onDelete: action.action
            };
        case Types.OnRefresh:
            return {
                ...state,
                onRefresh: action.action
            };
        default:
            return state;
    }
};
