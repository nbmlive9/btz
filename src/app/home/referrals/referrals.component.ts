import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent {
data1:any;
  constructor(private api:AuthUserService){}

  ngOnInit(){
    this.getreferrals();
  }

  getreferrals(){
    this.api.Referrals().subscribe((res:any)=>{
        console.log(res);
        this.data1=res.data;
    })
  }

}
