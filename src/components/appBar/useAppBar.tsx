import { useContext } from 'react';
import { AppBarContext, Types } from './AppBarProvider';

function _useAppBar() {
    return useContext(AppBarContext);
};


function createActionSetTitle(title: string) {
    return { type: Types.SetTitle, title: title };
};
function createActionOnSave(action?: () => void) {
    return { type: Types.OnSave, action: action };
};
function createActionOnDelete(action?: () => void) {
    return { type: Types.OnDelete, action: action };
};
function createActionOnRefresh(action?: () => void) {
    return { type: Types.OnRefresh, action: action };
};

function useAppBar() {
    const { state, dispatch } = _useAppBar();

    return {

        setTitle: (title: string): void => {
            dispatch(createActionSetTitle(title));
        },
        getTitle: (): string | undefined => {
            return state.title;
        },

        // Save

        onSave: (action?: () => void): void => {
            dispatch(createActionOnSave(action));
        },

        save: () => {
            state.onSave?.();
        },

        isSaveActive: (): boolean => {
            return state.onSave !== undefined;
        },

        // Delete

        onDelete: (action?: () => void): void => {
            dispatch(createActionOnDelete(action));
        },

        delete: () => {
            state.onDelete?.();
        },

        isDeleteActive: (): boolean => {
            return state.onDelete !== undefined;
        },

        // Reload

        onRefresh: (action?: () => void): void => {
            dispatch(createActionOnRefresh(action));
        },

        refresh: () => {
            state.onRefresh?.();
        },
        
        isRefreshActive: (): boolean => {
            return state.onRefresh !== undefined;
        },
    };
};

export default useAppBar;