import { Component } from '@angular/core';
import { Location } from '@angular/common';   // ✅ Correct import

@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.scss']
})
export class TransferAmountComponent {
  constructor(private location: Location) {}
  Back() {
  this.location.back();
}
}
