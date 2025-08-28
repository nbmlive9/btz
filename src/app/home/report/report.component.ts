import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  constructor(private location: Location) {}
  Back() {
  this.location.back();
}
}
