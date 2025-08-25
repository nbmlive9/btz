import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReceiveComponent } from '../receive/receive.component';
import { TransferAmountComponent } from '../transfer-amount/transfer-amount.component'; 

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'receive', component: ReceiveComponent },
  { path: 'transfer', component: TransferAmountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
