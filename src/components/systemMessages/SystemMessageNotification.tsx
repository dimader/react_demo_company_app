import React from 'react';
import useInfoMessageHandling from './useSystemMessages';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import {
    makeStyles, createStyles, Theme
} from '@material-ui/core';
import { SystemMessage } from '../../types/systemMessage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        error: {
            backgroundColor: '#d32f2f !important', // dark red: 'flex',
            color: '#fff !important', // Textfarbe
        },
        info: {
            backgroundColor: '#E0DF82 !important', // E0DF82 leichtes Gelb,
            color: '#000000 !important',
        }
    }),
);

/**
 * Darstellung der Notifikation Komponente.
 * @returns Notifikation Komponente
 */
function SystemMessageNotification() {
    const classes = useStyles();
    // const { error, removeError } = useErrorMessage();
    const infoService = useInfoMessageHandling();

    const handleClose = () => {
        infoService.clearMessages();
    };

    /**
     * Bestimmt basierend auf dem Status der Fehlermeldung um welche Klasse es sich bei der Fehlermeldung handelt.
     * @param error Objekt mit der Fehlermeldung.
     * @returns CSS Klasse
     */
    const errorClass = (error: SystemMessage | null): string => {
        if (error == null) {
            return classes.error;
        }

        return error.status === 'error' ? classes.error : classes.info;
    }

    let error = infoService.getMessage();
    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={!!error}
                onClose={handleClose}
                className={errorClass(error)}
            >
                <SnackbarContent
                    className={errorClass(error)}
                    message={error?.error}
                />
            </Snackbar>
        </React.Fragment>
    );
};

export default SystemMessageNotification;
