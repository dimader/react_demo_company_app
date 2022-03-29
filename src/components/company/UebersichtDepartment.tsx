import * as React from 'react';
import useCompanyStore from './useCompanyStore';
import useAppBar from '../appBar/useAppBar';
// Tabelle
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Department } from '../../types/department';

const useTableStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

export interface IUebersichtDepartmentsProps {}

export function UebersichtDepartments(props: IUebersichtDepartmentsProps) {

    const appBarService = useAppBar();

    const companyService = useCompanyStore();

    const [ data, setData ] = React.useState<Department[] | null>(null);

    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        setData(companyService.getAllDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {

        appBarService.setTitle(t('department.overview'));
        
        appBarService.onSave(undefined);

        appBarService.onDelete(undefined);

        appBarService.onRefresh(undefined);

    }, [i18n.language]);

    const classes = useTableStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('department.name')}</TableCell>
                        <TableCell align='right'>{t('department.place')}</TableCell>
                        <TableCell align='right'>{t('department.info')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data != null && data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component='th' scope='row'>
                                {row.name}
                            </TableCell>
                            <TableCell align='right'>{row.ort}</TableCell>
                            <TableCell align='right'>{row.info}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
