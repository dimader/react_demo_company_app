import * as React from 'react';
import { 
    Grid,
    TextField
} from '@material-ui/core';
import { Company, validate } from '../../types/company';
import useCompanyStore from './useCompanyStore';
import useAppBar from '../appBar/useAppBar';
import { useTranslation } from 'react-i18next';
import useSystemMessages from '../systemMessages/useSystemMessages';
import setInputChange from '../utils/input-util';

export interface IErfassungCompanyProps {}

export function ErfassungCompany(props: IErfassungCompanyProps) {

    const { t, i18n } = useTranslation();
    const infoService = useSystemMessages();
    const appBarService = useAppBar();
    const companyService = useCompanyStore();
    
    const [ data, setData ] = React.useState<Company>();

    const [ formErrors, setFormErrors ] = React.useState<Map<string, string>>(new Map());

    React.useEffect(() => {
        appBarService.setTitle(t('company.edit'));

        appBarService.onSave(() => {

            const errors = validate(data, t);

            setFormErrors(errors);

            if (errors.size > 0) {
                infoService.showErrorMessage(t('form.containsErrors'));
                return;
            }

            companyService.updateCompany( data as Company );

            infoService.showInfoMessage(t('form.saveSuccess'));
        });

        appBarService.onDelete(undefined);

        appBarService.onRefresh(() => {
            const company = companyService.getCompany();
            setData(company);

            infoService.showInfoMessage(t('form.discard'));
        });

    }, [data, i18n.language]);

    React.useEffect(() => {
        // Die Company laden und im State ablegen
        const company = companyService.getCompany();
        setData(company);
    }, []);

    const handleChange = (event: any) => {
        event.persist();

        // Standard behandlung
        setInputChange(setData, event);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <TextField
                    required
                    id='name'
                    name='name' // das muss dem Attr. Namen entsprechen !
                    label={t('company.name')}
                    fullWidth
                    value={data?.name}
                    onChange={handleChange}
                    error={formErrors.has('name')}
                    helperText={formErrors.get('name') || undefined }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id='ort'
                    name='ort'
                    label={t('company.place')}
                    fullWidth
                    value={data?.ort}
                    onChange={handleChange}
                    error={formErrors.has('ort')}
                    helperText={formErrors.get('ort') || undefined }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id='info'
                    name='info'
                    label={t('company.info')}
                    fullWidth
                    value={data?.info || ''} /* HINWEIS: Notwendig für optionale Attr. Sonst wird das Feld beim update nicht aktl (es bleibt der alte Wert stehen) */
                    onChange={handleChange}
                    error={formErrors.has('info')}
                    helperText={formErrors.get('info') || undefined }
                />
            </Grid>
        </Grid>
    );
};