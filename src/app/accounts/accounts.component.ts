import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountsService} from '../services/accounts.service';
import {Observable} from 'rxjs';
import {AccountDetails} from '../model/account.model';
import {AsyncPipe, DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-accounts',
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    NgForOf,
    NgClass
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accountFromGroup!:FormGroup;
  operationFormGroup!:FormGroup;
  currentPage:number=0;
  pageSize:number=5;
  accountObservable!:Observable<AccountDetails>;
  constructor(private fb:FormBuilder,private accountService:AccountsService) {
  }
  ngOnInit() {
    this.accountFromGroup=this.fb.group({
      accountId:this.fb.control('')
    });
    this.operationFormGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      destination:this.fb.control(null)
    });

  }

  handleSearchAccount() {
    let accountId:string=this.accountFromGroup.value.accountId;
    this.accountObservable=this.accountService.getAccount(accountId,this.currentPage,this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage=page;
    this.handleSearchAccount()

  }

  handleAccountOperation() {
    let accountId:string=this.accountFromGroup.value.accountId;
    let operationType=this.operationFormGroup.value.operationType;
    if (operationType=='DEBIT'){
      let req = {
        accountId: accountId,
        amount: this.operationFormGroup.value.amount,
        description: this.operationFormGroup.value.description
      };
      this.accountService.debit(req).subscribe({
        next: (response) => {
          console.log("Success:", response);
          alert(response);
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.error("Error", err);
          alert(err.value);
        }
      });
    }else if (operationType=='CREDIT'){
      let req = {
        accountId: accountId,
        amount: this.operationFormGroup.value.amount,
        description: this.operationFormGroup.value.description
      };
      this.accountService.credit(req).subscribe({
        next: (response) => {
          console.log("Success:", response);
          alert(response);
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.error("Error", err);
          alert(err.value);
        }
      });

    }else if (operationType=='TRANSFER'){
      let req = {
        sourceAccountId:accountId,
        destinationAccountId:this.operationFormGroup.value.destination,
        amount: this.operationFormGroup.value.amount,
        description: this.operationFormGroup.value.description
      };
      this.accountService.transfer(req).subscribe({
        next: (response) => {
          console.log("Success:", response);
          alert(response);
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.error("Error", err);
          alert(err.value);
        }
      });
    }

  }
}
