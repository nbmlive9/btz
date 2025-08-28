import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { GTeamComponent } from './g-team/g-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';
import { ReceiveComponent } from './receive/receive.component';
import { DepositComponent } from './deposit/deposit.component';
import { DirectTeamComponent } from './direct-team/direct-team.component';
import { ReportComponent } from './report/report.component';
import { BuyLiteComponent } from './buy-lite/buy-lite.component';
import { BuyProComponent } from './buy-pro/buy-pro.component';
import { BuyMaxComponent } from './buy-max/buy-max.component';



@NgModule({
  declarations: [
    HomeComponent,
    GTeamComponent,
    DashboardComponent,
    FooterComponent, ProfileComponent, TransferAmountComponent, ReceiveComponent, DepositComponent, DirectTeamComponent, ReportComponent, BuyLiteComponent, BuyProComponent, BuyMaxComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
