import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';

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
    private fb: FormBuilder, private token:TokenStorageService, private router:Router
  ) {
    this.form = this.fb.group({
      name: [''],
      password: [''],
      email: [''],
      wallet1: ['']
    });
  }

  ngOnInit() {
    this.getProfiledata();
  }

  Back() {
    this.location.back();
  }

     signOut(): void {
        this.token.signOut();
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
      wallet1: this.pfdata.wallet1,
      email: this.pfdata.email
    });
  }

  updateProfile() {
    const payload = this.form.value;
    this.api.UpdateProfile(payload).subscribe({
      next: (res: any) => {
        // console.log('Profile updated successfully', res);
        this.isEditing = false;
        this.form.disable(); // lock fields after saving
         setTimeout(() => {
              this.router.navigateByUrl('/profile'); // reload component
            }, 500);
      },
      error: (err: any) => {
        console.error('Error updating profile', err);
      }
    });
  }
  getProfiledata() {
    this.api.Profile().subscribe((res: any) => {
      this.pfdata = res.data[0];
      // console.log(res);
      
      this.form.patchValue({
        name: this.pfdata.name,
        password:  this.pfdata.password,
        wallet1: this.pfdata.wallet1,
        email: this.pfdata.email
      });
      this.form.disable(); 
    });
  }
}
