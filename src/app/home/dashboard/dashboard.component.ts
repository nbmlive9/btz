import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

import { BarcodeFormat } from '@zxing/library';   // 👈 important

declare var bootstrap: any;

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
   permissionDenied: boolean = false;
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

 openSharePopup() {
    const modalElement = document.getElementById('shareModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  shareTo(platform: string) {
    const regid = this.pfdata?.regid;
    const message = `Welcome to Bitraze! 🚀 Join for free: https://bitraze.org/referral/${regid}`;
    const encodedMessage = encodeURIComponent(message);

    let url = '';

    switch (platform) {
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=https://bitraze.org/referral/${regid}&text=${encodedMessage}`;
        break;
      case 'imo':
        if (navigator.share) {
          navigator.share({
            title: 'Bitraze Invite',
            text: message,
            url: `https://bitraze.org/referral/${regid}`,
          }).catch(err => console.error('Sharing failed:', err));
          return;
        } else {
          alert('Sharing not supported on this device');
          return;
        }
    }

    window.open(url, '_blank');
  }




}


