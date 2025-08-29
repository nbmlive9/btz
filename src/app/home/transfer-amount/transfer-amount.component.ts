import { Component } from '@angular/core';
import { Location } from '@angular/common';   // ✅ Correct import
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.scss']
})
export class TransferAmountComponent {
  pfdata:any;
    idselectmsg: string = '';
  regname:any;
    errorMessage = '';
    form:FormGroup;
    tdata:any;
  constructor(private location: Location, private api:AuthUserService, private fb:FormBuilder) {
     this.form = this.fb.group({
          regid: new FormControl('', [Validators.required]),
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

    onRegisterIdSelect(event: any) {
    const id = event.target.value;
    this.api.UserNameDisplay(id).subscribe(
      (res4: any) => {
        if (res4) {
          console.log(res4);
          this.regname = res4.data[0];
          this.idselectmsg = `User Name: ${this.regname.name}`;
          this.errorMessage = ''; // Reset the error message when data is correct
        } else {
          console.log(res4);
          this.regname = null; // Reset the regname object when data is incorrect
          this.errorMessage = 'Error fetching user data';
          this.idselectmsg = 'User Not Available';
        }
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.regname = null; // Reset the regname object when there's an error
        this.idselectmsg = '';
      }
    );
  }

  Transfer(){
      console.log(this.form.value);
      if (this.form.valid) {
        const val = {
          regid: this.form.value.regid,
          amount: this.form.value.amount,
        };
        this.api.TransferWallet(val).subscribe(
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
