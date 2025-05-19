import { Routes } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: 'new-customer', component: NewCustomerComponent },
  {path:'customer-accounts/:id',component:CustomerAccountsComponent},
  { path: 'login', component: LoginComponent },
  {path:'',redirectTo:'/login',pathMatch:"full"}
  //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

];
