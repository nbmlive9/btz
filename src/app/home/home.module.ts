import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { GTeamComponent } from './g-team/g-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';
import { ReceiveComponent } from './receive/receive.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    GTeamComponent,
    DashboardComponent,
    FooterComponent, ProfileComponent, TransferAmountComponent, ReceiveComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule
  ]
})
export class HomeModule { }
