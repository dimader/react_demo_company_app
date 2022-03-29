import React from 'react';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ReplayIcon from '@material-ui/icons/Replay';
import { useStyles } from '../styles/useStyles';
import useAppBar from './useAppBar';
import { useTranslation } from 'react-i18next';

export interface IAppBarDashboardProps { }

export function AppBarDashboard(props: IAppBarDashboardProps) {

    const classes = useStyles();
    const { t, i18n } = useTranslation();
    
    const appBarService = useAppBar();

    const handleLanguageClick = () => {
        i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de');
    };
    const handleSaveClick = () => {
        appBarService.save();
    };
    const handleDeleteClick = () => {
        appBarService.delete();
    };
    const handleReloadClick = () => {
        appBarService.refresh();
    };

    return (
        <AppBar
            position='fixed'
            className={clsx(classes.appBar, classes.appBarShift )}
        >
            <Toolbar>
                
                <Typography variant='h6' noWrap>
                    {appBarService.getTitle()}
                </Typography>

                <div className={classes.grow} />

                <IconButton
                    edge='end'
                    aria-label='switch language'
                    aria-haspopup='true'
                    onClick={handleLanguageClick}
                    color='inherit'
                >

                    <Typography variant='h6' noWrap>
                        {t('languageChangeButton')}
                    </Typography>
                </IconButton>

                <IconButton
                    edge='end'
                    aria-label='reload'
                    aria-haspopup='true'
                    onClick={handleReloadClick}
                    color='inherit'
                    disabled={!appBarService.isRefreshActive()}
                >
                    <ReplayIcon />
                </IconButton>
                <IconButton
                    edge='end'
                    aria-label='delete'
                    aria-haspopup='true'
                    onClick={handleDeleteClick}
                    color='inherit'
                    disabled={!appBarService.isDeleteActive()}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    edge='end'
                    aria-label='save'
                    aria-haspopup='true'
                    onClick={handleSaveClick}
                    color='inherit'
                    disabled={!appBarService.isSaveActive()}
                >
                    <SaveIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
    );
};
