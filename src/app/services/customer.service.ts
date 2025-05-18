import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>("http://localhost:8081/api/customers");
  }
  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>("http://localhost:8081/api/customers/search?keyword="+keyword);

  }
  public saveCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>("http://localhost:8081/api/customers",customer);
  }
  public deleteCustomer(id:String){
    return this.http.delete("http://localhost:8081/api/customers/"+id);
  }
}
