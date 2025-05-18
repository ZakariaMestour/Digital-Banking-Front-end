import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {CustomerService} from '../services/customer.service';
import {map, Observable} from 'rxjs';
import {Customer} from '../model/customer.model';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-customers',
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent  implements OnInit {
  customers!: Observable<Array<Customer>>;
  searchText: string = '';
  constructor(private customerService:CustomerService) {
  }

  ngOnInit() {
    this.customers= this.customerService.getCustomers()
  }
  searchCustomers(){
    this.customers = this.customerService.searchCustomers(this.searchText);
  }

  handleDeleteCustomer(customer:Customer) {
    this.customerService.deleteCustomer(customer.id).subscribe({
      next:(resp) => {
        this.customers=this.customers.pipe(
          map(data =>{
            let index=data.indexOf(customer);
            data.splice(index,1);
            return data;
          })
        );
      },
      error:err=>{
        console.log(err);
      }
    });

  }
}
