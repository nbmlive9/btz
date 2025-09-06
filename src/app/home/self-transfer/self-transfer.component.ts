import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../service/auth-user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-self-transfer',
  templateUrl: './self-transfer.component.html',
  styleUrls: ['./self-transfer.component.scss']
})
export class SelfTransferComponent {

    pfdata:any;
    idselectmsg: string = '';
  regname:any;
    errorMessage = '';
    form:FormGroup;
    tdata:any;
      qrCodeValue: string = '';
  constructor(private location: Location, private api:AuthUserService, private fb:FormBuilder, private route:ActivatedRoute) {
     this.form = this.fb.group({
          amount: new FormControl('', [Validators.required]),
        });
  }
  Back() {
  this.location.back();
}

ngOnInit(){
  this.getProfiledata();
  this.api.TransferWalletReport().subscribe((res:any)=>{
     console.log('transfer',res);
     this.tdata=res.data;
  })
}

 getProfiledata(){
    this.api.Profile().subscribe((res:any)=>{
      console.log('profile',res);
      this.pfdata=res.data[0];
    })
  }


  Transfer(){
      console.log(this.form.value);
      if (this.form.valid) {
        const val = {
          amount: this.form.value.amount,
        };
        this.api.SelfTransferWallet(val).subscribe(
          (a:any) => {
            if (a) {
              console.log(a);
                 this.form.reset();
            } else {
              console.log(a);
               this.form.markAllAsTouched();
              // this.errorMessage = a.msg.message;
              // this.mymsg = 'Profile Successfully Updated !!!';
            }
          },
          (err: any) => {
            // this.errorMessage = a.msg.message;
          },
        );
      }
    }

  
}
