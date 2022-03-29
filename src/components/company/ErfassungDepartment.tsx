import * as React from 'react';
import { useParams } from 'react-router-dom';
import { 
    Grid,
    TextField
} from '@material-ui/core';
import useCompanyStore from './useCompanyStore';
import useAppBar from '../appBar/useAppBar';
import useSystemMessages from '../systemMessages/useSystemMessages';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Department, validate } from '../../types/department';
import setInputChange from '../utils/input-util';
import Routes from '../utils/routes';

interface RouteParams {
    id: string
};

export interface IErfassungDepartmentProps {};

export function ErfassungDepartment(props: IErfassungDepartmentProps) {
    
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const infoService = useSystemMessages();
    const appBarService = useAppBar();
    const companyService = useCompanyStore();
    
    // Parameter die vom Routing übergeben werden:
    const { id } = useParams<RouteParams>();

    const [ data, setData ] = React.useState<Department>();

    const [ formErrors, setFormErrors ] = React.useState<Map<string, string>>(new Map());

    const isAddMode = !id;

    React.useEffect(() => {

        setFormErrors(new Map<string, string>());

        if (!isAddMode) {
            let department = companyService.getDepartment(id);
            if (department !== undefined) {
                setData(department);
            }
        } else {
            setData(undefined);
        }
    }, [id]);

    // Das setzen der Attr muss in einem useEffect erfolgen, sonst entsteht eine update kaskade die zum absturz führt
    // jedes set.. ruft ein update auf der Komponente (Provider) auf, diese aktl dann auch diese Komponente usw.
    React.useEffect(() => {

        appBarService.setTitle(isAddMode ? t('department.new') : t('department.edit'));

        appBarService.onSave(() => {

            const errors = validate(data, t);

            setFormErrors(errors);

            if (errors.size > 0) {
                infoService.showErrorMessage(t('form.containsErrors'));
                return;
            }

            companyService.addDepartment( {...data} as Department );

            if (isAddMode) {
                // Seite zurücksetzen, bei Bearbeitung soll die Seite beibehalten werden. 
                setData(undefined);
            }

            infoService.showInfoMessage(t('form.saveSuccess'));
        });

        appBarService.onDelete(
            isAddMode ? undefined : 
            () => {
                companyService.deleteDepartment(id);
                // Navigieren zur Übersicht
                history.push(Routes.departmentsOverview);

                infoService.showInfoMessage(t('form.deletedSuccess'));
        });

        appBarService.onRefresh(
            isAddMode ? undefined :
            () => {
                setData(companyService.getDepartment(id));

                infoService.showInfoMessage(t('form.discard'));
            }
        );

    }, [data, i18n.language]);

    const handleChange = (event: any) => {
        event.persist();

        // Standard behandlung
        setInputChange(setData, event);
    };

    // const tt = (label: string) => {
    //     console.log('intl: ' + label);
    //     return t(label);
    // };

    const intl = React.useMemo(() => {
        return {
            name: t('department.name'),
            info: t('department.info'),
            place: t('department.place')
        }
    }, [i18n.language]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <TextField
                    required
                    id='name'
                    name='name' // das muss dem Attr. Namen entsprechen !
                    // label={t('department.name')}
                    label={intl.name}
                    fullWidth
                    value={data?.name || ''}
                    onChange={handleChange}
                    error={formErrors.has('name')}
                    helperText={formErrors.get('name') || '' }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id='info'
                    name='info'
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
                    required
                    id='ort'
                    name='ort'
                    label={intl.place}
                    fullWidth
                    value={data?.ort || ''}
                    onChange={handleChange}
                    error={formErrors.has('ort')}
                    helperText={formErrors.get('ort') || '' }
                />
            </Grid>
        </Grid>
    );
};