import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showAssets: boolean = true;   // default = Assets
  showGTeam: boolean = false;
  back: any;

  setAssets() {
    this.showAssets = true;
    this.showGTeam = false;
  }

  setGTeam() {
    this.showAssets = false;
    this.showGTeam = true;
  }

}
