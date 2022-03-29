import * as React from 'react';
import useCompanyStore from './useCompanyStore';
import useAppBar from '../appBar/useAppBar';
import { format } from 'date-fns';
// Tabelle
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Employee } from '../../types/employee';

const useTableStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

export interface IUebersichtEmployeesProps {}

export function UebersichtEmployees(props: IUebersichtEmployeesProps) {

    const appBarService = useAppBar();
    const companyService = useCompanyStore();
    const [ data, setData ] = React.useState<Employee[] | null>(null);

    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        setData(companyService.getAllEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {

        appBarService.setTitle(t('employee.overview'));

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
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>{t('employee.position')}</TableCell>
                        <TableCell align='right'>{t('employee.birthdate')}</TableCell>
                        <TableCell align='right'>{t('employee.info')}</TableCell>
                        <TableCell align='right'>{t('employee.department')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data != null && data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component='th' scope='row'>
                                {row.name}
                            </TableCell>
                            <TableCell align='right'>{row.position}</TableCell>
                            <TableCell align='right'>{format(row.birthdate, 'dd.MM.yyyy')}</TableCell>
                            <TableCell align='right'>{row.info}</TableCell>
                            <TableCell align='right'>{row.department?.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
