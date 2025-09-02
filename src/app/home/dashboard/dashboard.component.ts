import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

import { BarcodeFormat } from '@zxing/library';   // 👈 important


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  back: any;
  team:any;
  walletAddress: string = '';
  copied: boolean = false;

  pack: any;
  copyAddres() {
    navigator.clipboard.writeText(this.walletAddress).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000); // hide after 2 sec
    });
  }

  pfdata:any;
  hdata:any;
  setassets: boolean = true;
  glevel: boolean = false;
  referrals: boolean = false;
    showSection(section: string) {
    this.setassets = section === 'setassets';
    this.glevel = section === 'glevel';
    this.referrals = section === 'referrals';
  }
  wdata:any;
  constructor(private api:AuthUserService){}

  ngOnInit(){
    this.getProfiledata();
    this.getDashboarddata();
    this.api.WalletReport().subscribe((res:any)=>{
     console.log('walletreport',res);
     this.wdata=res.data.data;
    });
    this.api.GetPackages().subscribe((res:any)=>{
        console.log('packages',res);
        this.pack=res.data;
    });
    // gteam
  
  }

  getProfiledata(){
    this.api.Profile().subscribe((res:any)=>{
      console.log('profile',res);
      this.pfdata=res.data[0];
    })
  }
    getDashboarddata(){
    this.api.DashboardData().subscribe((res:any)=>{
      console.log('homedata',res);
      this.hdata=res.data;
    })
  }


  showScanner = false;
  scannedResult: string | null = null;

  allowedFormats = [BarcodeFormat.QR_CODE];

  openqr() {
    this.showScanner = true;
  }

  closeqr() {
    this.showScanner = false;
  }

  onCodeResult(result: string) {
    console.log('Scanned QR:', result);
    this.scannedResult = result;

    // Auto-close like PhonePe after scanning
    this.showScanner = false;
  }
}


