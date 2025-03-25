import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import {CompanySetupComponent} from './pages/company-setup/company-setup.component'
import { ProductsetupComponent } from './pages/productsetup/productsetup.component';
import { BillingComponent } from './pages/Billing/billinglist/billing.component';
import { CreatInvoiceComponent } from './pages/creat-invoice/creat-invoice.component';
import { CreateBillInvoiceComponent } from './pages/Billing/create-bill-invoice/create-bill-invoice.component';
import {UserLoginComponent} from './pages/user-login/user-login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent
  },  
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'Companylist',
        component: CompanySetupComponent
      },
      {
        path: 'Productlist',
        component: ProductsetupComponent
      },
      {
        path: 'BillInvoice',
        component: BillingComponent
      },
      {
        path: 'GeneraetBill',
        component: CreateBillInvoiceComponent
      },
      {
        path: 'CreateInvoice',
        component: CreatInvoiceComponent
      }
    ],
  }
];

// export const routes: Routes = [ 
//     {
//         path:'',
//         redirectTo: 'list',
//         pathMatch:'full'
//     },
//     {
//         path:'list',
//         component:CompanySetupComponent
//     }
// ];
