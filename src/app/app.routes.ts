import { Routes } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';
import {LoginComponent} from './login/login.component';
import {authenticationGuard} from './guards/authentication.guard';
import {authorizationGuard} from './guards/authorization.guard';

export const routes: Routes = [
  // { path: 'accounts', component: AccountsComponent },
  // { path: 'new-customer', component: NewCustomerComponent },
  // {path:'customer-accounts/:id',component:CustomerAccountsComponent},
  // { path: 'login', component: LoginComponent },
  // {path:'',redirectTo:'/login',pathMatch:"full"}

  // { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: "login", component: LoginComponent },
  //
  // {
  //   path: "admin",
  //
  //   canActivate: [authenticationGuard],
  //   children: [
  //     { path: "", redirectTo: "customers", pathMatch: "full" },
  //
  //     { path: "customers", component: CustomersComponent },
  //     { path: "accounts", component: AccountsComponent },
  //     { path: "new-customer", component: NewCustomerComponent, canActivate: [authorizationGuard], data: { role: "ADMIN" } },
  //   ]
  // }
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "admin",

    canActivate: [authenticationGuard],
    children: [
      { path: "", redirectTo: "customers", pathMatch: "full" },
      { path: "customers", component: CustomersComponent },
      { path: "accounts", component: AccountsComponent },
      { path: "new-customer", component: NewCustomerComponent, canActivate: [authorizationGuard], data: { role: "ADMIN" } },
    ]
  }



];
