import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {NgForOf, NgIf} from '@angular/common';
@Component({
  selector: 'app-customers',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent  implements OnInit {
  customers: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get("http://localhost:8081/api/customers").subscribe({
      next:(data)=>{
        this.customers=data;
      }, error:(err)=>{
        console.log(err);
      }
    });

  }
}
