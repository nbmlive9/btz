import { Component } from '@angular/core';
import { Location } from '@angular/common';   // ✅ Correct import
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { BrowserQRCodeReader } from '@zxing/browser';
declare var bootstrap: any;
@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.scss']
})
export class TransferAmountComponent {
  pfdata:any;
    idselectmsg: string = '';
  regname:any;
    successMessage: string = '';
errorMessage: string = '';
    form:FormGroup;
    tdata:any;
      qrCodeValue: string = '';
      allowedFormats = [BarcodeFormat.QR_CODE];

  // Force back camera
  videoConstraints = {
    facingMode: { exact: 'environment' }  // ✅ Forces back camera
  };

  constructor(private location: Location, private api:AuthUserService, private fb:FormBuilder, private route:ActivatedRoute, private router:Router) {
     this.form = this.fb.group({
          regid: new FormControl('', [Validators.required]),
          amount: new FormControl('', [Validators.required]),
        });
  }
  Back() {
  this.location.back();
}

ngOnInit(){
   // Get QR Code value from URL
this.qrCodeValue = this.route.snapshot.paramMap.get('id') || '';
    if (this.qrCodeValue) {
      this.form.patchValue({ regid: this.qrCodeValue });
    }


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

    openScanner() {
    const modalElement = document.getElementById('qrScannerModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

   onScanSuccess(result: string) {
    console.log('QR Code Result:', result);
    // Example: Fill the regid field only
    this.form.patchValue({ regid: result });
    this.onRegisterIdSelect({ target: { value: result } });
  }

  onPermissionResponse(event: boolean) {
  if (event) {
    console.log('Camera permission granted.');
  } else {
    console.warn('Camera permission denied by user.');
    alert('Camera permission is required to scan QR codes.');
  }
}

onPermissionDenied(event: any) {
  console.error('Camera access was denied:', event);
  alert('Please allow camera access to scan QR codes.');
}

/** 📸 Decode QR Code from Image File */
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const codeReader = new BrowserQRCodeReader();
      const imgUrl = URL.createObjectURL(file);

      // Decode the image
      const result = await codeReader.decodeFromImageUrl(imgUrl);

      if (result?.getText()) {
        const scannedRegId = result.getText();
        console.log('Scanned QR Code:', scannedRegId);

        // Update form with scanned regid
        this.form.patchValue({ regid: scannedRegId });

        // Validate user automatically
        this.onRegisterIdSelect({ target: { value: scannedRegId } });
      } else {
        alert('No QR code detected in the image.');
      }
    } catch (error) {
      console.error('QR Scan Error:', error);
      alert('Unable to read QR code from image.');
    }
  }

Transfer() {
  if (this.form.valid) {
    const val = {
      regid: this.form.value.regid,
      amount: this.form.value.amount,
    };

    this.api.TransferWallet(val).subscribe(
      (res: any) => {
        if (res) {
          this.form.reset();
          this.successMessage = '✅ Amount transferred successfully!';
          this.errorMessage = '';
          setTimeout(() => {
          this.router.navigateByUrl('/transfer'); // redirect or reload component
        }, 1000);
          // Optionally reload transactions after transfer
          this.api.TransferWalletReport().subscribe((res: any) => {
            this.tdata = res.data;
          });
        } else {
          this.successMessage = '';
          this.errorMessage = '❌ Transfer failed. Please try again.';
          this.form.markAllAsTouched();
             setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/transfer']);
        });
      }, 2000);
        }
      },
      (err: any) => {
        this.successMessage = '';
        this.errorMessage = '❌ Transfer failed. Please try again.';
             setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/transfer']);
        });
      }, 2000);
      }
    );
  }
}


}
