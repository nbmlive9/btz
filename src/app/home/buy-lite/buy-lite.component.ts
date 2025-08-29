import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buy-lite',
  templateUrl: './buy-lite.component.html',
  styleUrls: ['./buy-lite.component.scss']
})
export class BuyLiteComponent {
  adata:any;
  form: FormGroup;
  pack:any;
  pdata: any;
  //form1:FormGroup;
  constructor(private location: Location, private api:AuthUserService, private fb:FormBuilder) {
      this.form = this.fb.group({
      package: new FormControl('1'),
      regid: new FormControl(''),
       });
  }
  Back() {
  this.location.back();
}

ngOnInit(){
  this.getpackages();
  this.api.ActivationData().subscribe((res:any)=>{
    console.log(res);
    this.adata=res.data;
  });
    this.api.Profile().subscribe((res:any)=>{
    console.log(res);
    this.pdata=res.data[0];
  });
}

getpackages(){
  this.api.GetPackages().subscribe((res:any)=>{
    console.log('packages',res);
    this.pack=res.data;
    
  })
}

submitAction() {
  console.log(this.form.value);

  if (this.form.valid) {
    const val = {
      package: this.form.value.package,
      regid: this.form.value.regid,
    };

    if (this.pdata.topupstatus == '0') {
      // Call Activation
      this.api.Activation(val).subscribe(
        (res: any) => {
          console.log('Activation response:', res);
          this.form.reset();
        },
        (err: any) => {
          console.error('Activation error:', err);
        }
      );
    } else if (this.pdata.topupstatus == '1') {
      // Call Topup
      this.api.Topup(val).subscribe(
        (res: any) => {
          console.log('Topup response:', res);
          this.form.reset();
        },
        (err: any) => {
          console.error('Topup error:', err);
        }
      );
    }
  } else {
    this.form.markAllAsTouched();
  }
}

}
