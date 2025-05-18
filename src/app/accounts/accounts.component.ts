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
  currentPage:number=0;
  pageSize:number=5;
  accountObservable!:Observable<AccountDetails>;
  constructor(private fb:FormBuilder,private accountService:AccountsService) {
  }
  ngOnInit() {
    this.accountFromGroup=this.fb.group({
      accountId:this.fb.control('')
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
}
