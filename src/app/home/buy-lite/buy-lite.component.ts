import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buy-lite',
  templateUrl: './buy-lite.component.html',
  styleUrls: ['./buy-lite.component.scss']
})
export class BuyLiteComponent {
  constructor(private location: Location) {}
  Back() {
  this.location.back();
}
}
