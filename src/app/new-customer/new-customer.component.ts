import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomerService} from '../services/customer.service';
import {RouterLink} from '@angular/router';
import {Customer} from '../model/customer.model';

@Component({
  selector: 'app-new-customer',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup!:FormGroup;

  constructor(private customerService:CustomerService,private fb : FormBuilder) {
  }

  handleSaveCustomer() {
    let customer:Customer=this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next:data=>{
        alert("Customer has been successfully added!");
        this.newCustomerFormGroup.reset();
      },
      error:err => {
        console.log(err);
      }
    });
  }
  ngOnInit() {
    this.newCustomerFormGroup=this.fb.group({
      name:this.fb.control(null,Validators.required),
      email:this.fb.control(null,[Validators.required,Validators.email])
    })
  }
}
