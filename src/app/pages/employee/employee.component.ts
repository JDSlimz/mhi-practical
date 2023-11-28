import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import { Employee } from '../../app.component';
import exployeeData from '../../../assets/json/employees.json';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  private routeSub!: Subscription;
  private employees: Employee[];
  public selectedEmployee: Employee | undefined;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.employees = exployeeData;
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.selectedEmployee = this.employees.find(x => x.id == params['id']);
      if(!this.selectedEmployee){

      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  goHome() {
    this.router.navigateByUrl('');
  }
}
