import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetails} from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor( private http:HttpClient) {}
  public getAccount(accountId:string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>("http://localhost:8081/api/accounts/"+accountId+"/operations?page="+page+"&size="+size);
  }
}
