import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-direct-team',
  templateUrl: './direct-team.component.html',
  styleUrls: ['./direct-team.component.scss']
})
export class DirectTeamComponent {
  constructor(private location: Location) {}
  Back() {
  this.location.back();
}
}
