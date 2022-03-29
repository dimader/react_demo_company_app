const Routes = {

    // company
    company: '/company',

    // employee
    employeesOverview: '/employees',
    employeeNew: '/employee',
    employeeEdit: '/employee/:id',
    employeeEditById: (id: string | undefined) => '/employee/' + id,

    // department
    departmentsOverview: '/departments',
    departmentNew: '/department',
    departmentEdit: '/department/:id',
    departmentEditById: (id: string | undefined) => '/department/' + id,
};

export default Routes;
