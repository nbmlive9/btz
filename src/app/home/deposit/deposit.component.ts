import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
  constructor(private location: Location) {}
  Back() {
  this.location.back();
}
}
