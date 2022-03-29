import * as React from 'react';
import { useParams } from 'react-router-dom';
import { 
    Grid,
    TextField,
    Select,
    MenuItem,
    InputLabel
} from '@material-ui/core';
import { format } from 'date-fns';
import setInputChange from '../utils/input-util';
import useCompanyStore from './useCompanyStore';
import useAppBar from '../appBar/useAppBar';
import useSystemMessages from '../systemMessages/useSystemMessages';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Employee, EmployeeRoleEnum, validate } from '../../types/employee';
import Routes from '../utils/routes';

interface RouteParams {
    id: string
};

export interface IErfassungEmployeeProps {};

export function ErfassungEmployee(props: IErfassungEmployeeProps) {
    
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const infoService = useSystemMessages();
    const appBarService = useAppBar();
    const companyService = useCompanyStore();
    
    // Parameter die vom Routing übergeben werden:
    const { id } = useParams<RouteParams>();

    const [ data, setData ] = React.useState<Employee>();

    const [ formErrors, setFormErrors ] = React.useState<Map<string, string>>(new Map());

    const isAddMode = !id;

    React.useEffect(() => {

        setFormErrors(new Map<string, string>());

        if (!isAddMode) {
            let employee = companyService.getEmployee(id);
            if (employee !== undefined) {
                setData(employee);
            }
        } else {
            setData(undefined);
        }
    }, [id]);

    // Das setzen der Attr muss in einem useEffect erfolgen, sonst entsteht eine update kaskade die zum absturz führt
    // jedes set.. ruft ein update auf der Komponente (Provider) auf, diese aktl dann auch diese Komponente usw.
    React.useEffect(() => {

        appBarService.setTitle(isAddMode ? t('employee.new') : t('employee.edit'));

        appBarService.onSave(() => {

            const errors = validate(data, t);

            setFormErrors(errors);

            if (errors.size > 0) {
                infoService.showErrorMessage(t('form.containsErrors'));
                return;
            }

            companyService.addEmployee( {...data} as Employee );

            if (isAddMode) {
                // Seite zurücksetzen, bei Bearbeitung soll die Seite beibehalten werden. 
                setData(undefined);
            }

            infoService.showInfoMessage(t('form.saveSuccess'));
        });

        appBarService.onDelete(
            isAddMode ? undefined : 
            () => {
                companyService.deleteEmployee(id);
                // Navigieren zur Übersicht
                history.push(Routes.employeesOverview);

                infoService.showInfoMessage(t('form.deletedSuccess'));
        });

        appBarService.onRefresh(
            isAddMode ? undefined :
            () => {
                setData(companyService.getEmployee(id));

                infoService.showInfoMessage(t('form.discard'));
            }
        );

    }, [data, i18n.language]);

    const handleChange = (event: any) => {
        event.persist();

        // Sonderbehandlung für Abteilung
        if (event.target.name === 'department') {
            setData(values => ({
                ...values,
                // Objekt mit der ID aus dem Service lesen und eintragen:
                [event.target.name]: companyService.getDepartment(event.target.value as string)
            } as Employee));
            return;
        }

        // Standard behandlung für alle weiteren Arten
        setInputChange(setData, event);
    };

    // const tt = (label: string) => {
    //     console.log('internat: ' + label);
    //     return t(label);
    // };

    // Memo Internationalisierung 
    const intl = React.useMemo(() => {
        return {
            name: t('employee.name'),
            position: t('employee.position'),
            info: t('employee.info'),
            birthdate: t('employee.birthdate'),
            department: t('employee.department')
        };
    }, [i18n.language]);
        
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <TextField
                    required
                    id='name'
                    name='name' // das muss dem Attr. Namen entsprechen !
                    // label={t('employee.name')}
                    label={intl.name}
                    fullWidth
                    value={data?.name || ''}
                    onChange={handleChange}
                    error={formErrors.has('name')}
                    helperText={formErrors.get('name') || '' }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputLabel shrink id='simple-select-label'>
                    Position
                </InputLabel>
                <Select
                    id='position'
                    name='position'
                    // label={t('employee.position')}
                    label={intl.position}
                    fullWidth
                    value={data?.position || ''}
                    onChange={handleChange}
                >
                    <MenuItem value={EmployeeRoleEnum.Ceo}>CEO</MenuItem>
                    <MenuItem value={EmployeeRoleEnum.DevOp}>DevOp</MenuItem>
                    <MenuItem value={EmployeeRoleEnum.Dev}>Dev</MenuItem>
                    <MenuItem value={EmployeeRoleEnum.Chef}>Chef</MenuItem>
                    <MenuItem value={EmployeeRoleEnum.Engineer}>Engineer</MenuItem>
                    
                </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id='info'
                    name='info'
                    // label={t('employee.info')}
                    label={intl.info}
                    fullWidth
                    value={data?.info || ''} /* HINWEIS: Notwendig für optionale Attr. Sonst wird das Feld beim update nicht aktl (es bleibt der alte Wert stehen) */
                    onChange={handleChange}
                    error={formErrors.has('info')}
                    helperText={formErrors.get('info') || '' }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id='birthdate'
                    // label={t('employee.birthdate')}
                    label={intl.birthdate}
                    type='date'
                    name='birthdate'
                    value={data?.birthdate ? format(data?.birthdate as Date, 'yyyy-MM-dd') : ''}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={formErrors.has('birthdate')}
                    helperText={formErrors.get('birthdate') || '' }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputLabel shrink id='simple-select-label'>
                    {intl.department}
                </InputLabel>
                <Select
                    id='department'
                    name='department'
                    fullWidth
                    value={data?.department?.id || ''}
                    onChange={handleChange}
                >
                    {
                        companyService.getAllDepartments().map(department => {
                            /* Type 'Department' is not assignable to type 'string | number | readonly string[] | undefined'. -> value darf nicht das Objekt selbst sein. */
                            return <MenuItem selected value={department.id}>{department.name}</MenuItem>;
                        })
                    }
                </Select>
            </Grid>
        </Grid>
    );
};