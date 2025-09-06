import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-referral-link-share',
  templateUrl: './referral-link-share.component.html',
  styleUrls: ['./referral-link-share.component.scss']
})
export class ReferralLinkShareComponent {

  form: FormGroup;
    udata: any;
    idselectmsg: string = '';
    regname: any;
    errorMessage = '';
  id:any;
  data1:any;
    constructor(private fb: FormBuilder, private api: AuthUserService, private router:Router, private activeroute:ActivatedRoute) {
      this.form = this.fb.group({
        sponcerid: new FormControl('', ),
        name: new FormControl('', [Validators.required]),
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        terms: new FormControl('', [Validators.required]),
      });
    }
  
    ngOnInit() {
          this.id = this.activeroute.snapshot.params['regid'];
    this.api.UserNameDisplay(this.id).subscribe((res: any) => {
      if (res && res.data && res.data.length > 0) {
        this.data1 = res.data[0];
       this.form.get('sponcerid')!.setValue(this.data1.regid);
      }
    });
    }
  
 
  
   userSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const val = {
      sponcerid: this.form.value.sponcerid,
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };
  
    this.api.UserRegistration(val).subscribe(
      (res: any) => {
        if (res) {
          this.udata = res.adddata;
          this.form.reset();
          // Redirect after 3s
          setTimeout(() => {
            this.router.navigateByUrl('/sign'); // redirect or reload component
          }, 3000);
        }
      },
      (err: any) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    );
  }
  
  

}
