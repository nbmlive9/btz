import { Component } from '@angular/core';
import { Location } from '@angular/common';   // ✅ Correct import


@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent {


  constructor(private location: Location) {}
goBack() {
  this.location.back();
}

  walletAddress: string = 'TMjRqfsBJWATC57KwY2aRnHB7uc3f7Z5B';
  copied: boolean = false;

  copyAddress() {
    navigator.clipboard.writeText(this.walletAddress).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000); // hide after 2 sec
    });
  }

}
