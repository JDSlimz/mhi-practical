import { Routes } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', component: TableComponent},
    {path: 'employee/:id', component: EmployeeComponent},
    {path: '**', component: PageNotFoundComponent}
];
