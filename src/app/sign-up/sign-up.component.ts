// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthUserService } from '../home/service/auth-user.service';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.scss']
// })
// export class SignUpComponent {
// form:FormGroup;
// udata:any;
//   idselectmsg: string = '';
//   regname:any;
//     errorMessage = '';
//   constructor(private fb:FormBuilder, private api:AuthUserService){
//       //User Registration Form
//      this.form = this.fb.group({
//       sponcerid: new FormControl('', [Validators.required]),
//       name: new FormControl('', [Validators.required]),
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       terms: new FormControl('', [Validators.required]),
//     });
//   }

//   ngOnInit(){
//   }

//   onRegisterIdSelect(event: any) {
//     const id = event.target.value;
//     this.api.UserNameDisplay(id).subscribe(
//       (res4: any) => {
//         if (res4) {
//           console.log(res4);
//           this.regname = res4.data[0];
//           this.idselectmsg = `User Name: ${this.regname.name}`;
//           this.errorMessage = ''; // Reset the error message when data is correct
//         } else {
//           console.log(res4);
//           this.regname = null; // Reset the regname object when data is incorrect
//           this.errorMessage = 'Error fetching user data';
//           this.idselectmsg = 'User Not Available';
//         }
//       },
//       (err: any) => {
//         this.errorMessage = err.error.message;
//         this.regname = null; // Reset the regname object when there's an error
//         this.idselectmsg = '';
//       }
//     );
//   }

//   userSubmit(){
//       console.log(this.form.value);
//       if (this.form.valid) {
//         const val = {
//           sponcerid: this.form.value.sponcerid,
//           name: this.form.value.name,
//           email: this.form.value.email,
//           password: this.form.value.password,
//         };
//         this.api.UserRegistration(val).subscribe(
//           (a:any) => {
//             if (a) {
//               console.log(a);
//                 this.udata=a.adddata;
//                  this.form.reset();
//             } else {
//               console.log(a);
//                this.form.markAllAsTouched();
//               // this.errorMessage = a.msg.message;
//               // this.mymsg = 'Profile Successfully Updated !!!';
//             }
//           },
//           (err: any) => {
//             // this.errorMessage = a.msg.message;
//           },
//         );
//       }
//     }

// }

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  udata: any;
  idselectmsg: string = '';
  regname: any;
  errorMessage = '';

  constructor(private fb: FormBuilder, private api: AuthUserService) {
    this.form = this.fb.group({
      sponcerid: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const modalEl = document.getElementById('exampleModal');
    if (modalEl) {
      modalEl.addEventListener('shown.bs.modal', () => {
        this.launchConfetti();
      });
    }
  }

  onRegisterIdSelect(event: any) {
    const id = event.target.value;
    this.api.UserNameDisplay(id).subscribe(
      (res4: any) => {
        if (res4) {
          this.regname = res4.data[0];
          this.idselectmsg = `User Name: ${this.regname.name}`;
          this.errorMessage = '';
        } else {
          this.regname = null;
          this.idselectmsg = 'User Not Available';
          this.errorMessage = 'Error fetching user data';
        }
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.regname = null;
        this.idselectmsg = '';
      }
    );
  }

  userSubmit() {
    if (this.form.valid) {
      const val = {
        sponcerid: this.form.value.sponcerid,
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this.api.UserRegistration(val).subscribe(
        (a: any) => {
          if (a) {
            this.udata = a.adddata;
            this.form.reset();
          } else {
            this.form.markAllAsTouched();
          }
        },
        (err: any) => {
          this.errorMessage = err.error?.message || 'Registration failed';
        },
      );
    }
  }

  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    // Create confetti instance on our modal canvas
    const myConfetti = (confetti as any).create(canvas, { resize: true, useWorker: true });

    // Blast once
    myConfetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Small stream for 2 seconds
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      myConfetti({
        particleCount: 6,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}
