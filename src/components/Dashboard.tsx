import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Collapse, ListItemSecondaryAction, Tooltip } from '@material-ui/core';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
// Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import { Business as BusinessIcon,
    PeopleAlt as EmployeeIcon,
    Domain as DevisionSearchIcon,
    Home as DevisionIcon 
    } from '@material-ui/icons/';
import PeopleIcon from '@material-ui/icons/EmojiPeople';
import { useTranslation } from 'react-i18next';
import Routes from './utils/routes';
// Seiten
import { ErfassungCompany } from './company/ErfassungCompany';
import { ErfassungEmployee } from './company/ErfassungEmployee';
import { AppBarDashboard } from './appBar/AppBarDashboard';
import { UebersichtEmployees } from './company/UebersichtEmployee';
// Store
import useCompanyStore from './company/useCompanyStore';
import { ErfassungDepartment } from './company/ErfassungDepartment';
import { UebersichtDepartments } from './company/UebersichtDepartment';
// CSS
import { useStyles } from './styles/useStyles';

export function Dashboard() {
    const classes = useStyles();
    const { t } = useTranslation();
    
    const [openSubmenuEmployee, setOpenSubmenuEmployee] = React.useState(true);
    const [openSubmenuDevision, setOpenSubmenuDevision] = React.useState(true);

    const companyService = useCompanyStore();
    const history = useHistory();

    React.useEffect(() => {
        // Daten initial laden
        companyService.load();
    }, []);

    const handleClickEmployee = () => {
        setOpenSubmenuEmployee(!openSubmenuEmployee);
    };
    const handleClickDevision = () => {
        setOpenSubmenuDevision(!openSubmenuDevision);
    };

    const handleEmployeeAddClick = () => {
        // Navigieren... 
        history.push(Routes.employeeNew);
    };
    const handleDevisionAddClick = () => {
        history.push(Routes.departmentNew);
    };

    return (
        <div className={classes.root}>
            
            <AppBarDashboard />

            <Drawer
                variant='permanent'
                className={ classes.drawer }
                classes={{
                    paper: classes.drawer,
                }}
                
            >
                <div className={classes.toolbar}></div>

                <Divider />
                
                <List dense={true}>
                    <ListItem button component={Link} to={Routes.company}>
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.company')} secondary={ companyService.getCompany()?.name } />
                    </ListItem>
                </List>

                <Divider />

                <List dense={true}>
                    <ListItem button onClick={handleClickEmployee}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.employees')} />
                        
                        <ListItemSecondaryAction onClick={handleEmployeeAddClick}>
                            <IconButton edge='end'>
                                <AddIcon />
                            </IconButton>
                        </ListItemSecondaryAction>

                    </ListItem>
                    <Collapse in={openSubmenuEmployee} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding dense={true}>

                            <Tooltip placement='left' title={t('test') as string /* Das ist kein Witz, an dieser Stelle sind das was title erwartet und was t liefert nicht kompatibel! -> https://github.com/mui-org/material-ui/issues/20537 */}>
                                <ListItem button className={ classes.nested } component={Link} to={Routes.employeesOverview}> 
                                    <ListItemIcon><MenuIcon /></ListItemIcon>
                                    <ListItemText primary={t('sidebar.table')} />
                                </ListItem>
                            </Tooltip>

                            {companyService.getAllEmployees().map((eachData, index) => (
                            
                                <Tooltip placement='left' title={eachData.name}>
                                    <ListItem button className={ classes.nested } key={eachData.id} component={Link} to={Routes.employeeEditById(eachData.id)}> 
                                        <ListItemIcon><EmployeeIcon /></ListItemIcon>
                                        <ListItemText primary={eachData.name} secondary={eachData.info} />
                                    </ListItem>
                                </Tooltip>

                            ))}

                        </List>
                    </Collapse>
                </List>

                <Divider />

                <List dense={true}>
                    <ListItem button onClick={handleClickDevision}>
                        <ListItemIcon>
                            <DevisionSearchIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.devisions')} />

                        <ListItemSecondaryAction onClick={handleDevisionAddClick}>
                            <IconButton edge='end'>
                                <AddIcon />
                            </IconButton>
                        </ListItemSecondaryAction>

                    </ListItem>
                    <Collapse in={openSubmenuDevision} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding dense={true}>

                            <Tooltip placement='left' title={t('sidebar.showAllTableHint') as string /* Siehe Kommentar oben! */ }>
                                <ListItem button className={ classes.nested } component={Link} to={Routes.departmentsOverview}> 
                                    <ListItemIcon><MenuIcon /></ListItemIcon>
                                    <ListItemText primary={t('sidebar.table')} />
                                </ListItem>
                            </Tooltip>

                            {companyService.getAllDepartments().map((eachData, index) => (
                                <Tooltip placement='left' title={eachData.name}>
                                    <ListItem button className={ classes.nested } key={eachData.id} component={Link} to={Routes.departmentEditById(eachData.id)}>
                                        <ListItemIcon><DevisionIcon /></ListItemIcon>
                                        <ListItemText primary={eachData.name} secondary={eachData.info} />
                                    </ListItem>
                                </Tooltip>
                            ))}

                        </List>
                    </Collapse>

                </List>

            </Drawer>
            <main className={classes.content}>

                <div className={classes.toolbar} />

                <Switch>
                    {/* Inhalt des Hauptfensters, routing auf die richtige Komponente */}
                    <Route exact path={Routes.company}>
                        <ErfassungCompany />
                    </Route>

                    <Route exact path={Routes.employeesOverview}>
                        { /** Übersicht */ }
                        <UebersichtEmployees />
                    </Route>
                    <Route path={Routes.employeeEdit}>
                        { /** Bearbeitung */ }
                        <ErfassungEmployee />
                    </Route>
                    <Route path={Routes.employeeNew}>
                        { /** Neuanlage */ }
                        <ErfassungEmployee />
                    </Route>
                    
                    <Route exact path={Routes.departmentsOverview}>
                        <UebersichtDepartments />
                    </Route>
                    <Route path={Routes.departmentEdit}>
                        <ErfassungDepartment />
                    </Route>
                    <Route path={Routes.departmentNew}>
                        <ErfassungDepartment />
                    </Route>
                    
                </Switch>

            </main>
        </div>
    );
};
