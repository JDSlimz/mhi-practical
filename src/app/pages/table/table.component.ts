import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../app.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import exployeeData from '../../../assets/json/employees.json';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit {
  public employees: Employee[] = [];
  public idToSearch: number|undefined;
  displayedColumns: string[] = ['id', 'employee_name', 'employee_salary', 'employee_age'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(public http:HttpClient, private router: Router, private snackBar: MatSnackBar){
    this.populateEmployees();
    this.dataSource = new MatTableDataSource(this.employees);
  }

  ngAfterViewInit (): void {
    this.dataSource.sort = this.sort;
  }

  populateEmployees(){
    this.employees = exployeeData;
    //This section is an example of how it would have been handled via get request
    /* this.http.get("http://dummy.restapiexample.com/api/v1/employees",
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      }).subscribe(response =>{
         for(let employee of response){
          populatedEmployees.push(<Employee>{
            id: employee.id,
            employee_name: employee.employee_name,
            employee_salary: employee.employee_salary,
            employee_age: employee.employee_age,
            profile_image: employee.profile_image
          });
        }  
    }); */
  }

  searchId(){
    let message = "";
    const snackbarConfig = new MatSnackBarConfig();
    snackbarConfig.duration = 3000;
    const selectedEmployee = this.employees.find(x => x.id == this.idToSearch);

    if(!selectedEmployee){
      message = "Invalid Employee.";
      snackbarConfig.panelClass = ['snackbar-error'];
    } else if(!this.nameBeginsWithVowel(selectedEmployee.employee_name)){
      message = "Employee's name does not begin with a vowel.";
      snackbarConfig.panelClass = ['snackbar-error'];
    } else {
      message = selectedEmployee.employee_name;
    }

    this.snackBar.open(message, '', snackbarConfig);
  }

  nameBeginsWithVowel(name: string): boolean{
    const firstLetter = name.charAt(0).toLowerCase();
    return firstLetter ? ['a', 'e', 'i', 'o', 'u'].indexOf(firstLetter) !== -1 : false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToEmployee(id: number){
    this.router.navigateByUrl('/employee/'+id);
  }
}
