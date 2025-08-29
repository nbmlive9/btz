import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pfdata: any;
  form: FormGroup;
  isEditing = false;   // ✅ control edit mode

  constructor(
    private location: Location,
    private api: AuthUserService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      password: [''],
      email: [''],
      walletaddress: [''],
      smartid:['']
    });
  }

  ngOnInit() {
    this.getProfiledata();
  }

  Back() {
    this.location.back();
  }

  enableEdit() {
    this.isEditing = true;
    this.form.enable(); // allow typing
  }

  cancelEdit() {
    this.isEditing = false;
    this.form.disable(); 
    this.form.patchValue({
      name: this.pfdata.name,
      password: '',
      walletaddress: this.pfdata.walletaddress,
      email: this.pfdata.email,
      smartid:this.pfdata.smartid
    });
  }

  updateProfile() {
    const payload = this.form.value;
    this.api.UpdateProfile(payload).subscribe({
      next: (res: any) => {
        console.log('Profile updated successfully', res);
        this.isEditing = false;
        this.form.disable(); // lock fields after saving
      },
      error: (err: any) => {
        console.error('Error updating profile', err);
      }
    });
  }
  getProfiledata() {
    this.api.Profile().subscribe((res: any) => {
      this.pfdata = res.data[0];
      console.log(res);
      
      this.form.patchValue({
        name: this.pfdata.name,
        password:  this.pfdata.password,
        walletaddress: this.pfdata.walletaddress,
        email: this.pfdata.email,
        smartid:this.pfdata.smartid
      });
      this.form.disable(); 
    });
  }
}
