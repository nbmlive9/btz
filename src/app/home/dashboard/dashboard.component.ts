import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  showAssets: boolean = true;   // default = Assets
  showGTeam: boolean = false;
  back: any;

  walletAddress: string = 'TMjRqfsBJWATC57KwY2aRnH';
  copied: boolean = false;
  copyAddres() {
    navigator.clipboard.writeText(this.walletAddress).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000); // hide after 2 sec
    });
  }
  setAssets() {
    this.showAssets = true;
    this.showGTeam = false;
  }

  setGTeam() {
    this.showAssets = false;
    this.showGTeam = true;
  }


}
