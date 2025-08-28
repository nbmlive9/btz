import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

const AUTH_API ='https://bitraze.org/BTRZ/BTRZ/User/'

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http:HttpClient, public token: TokenStorageService) { }

  UserRegistration(value: any){
    return this.http.post(
      AUTH_API + 'Register', value, {
        responseType: 'json',
      });
  }

   UserNameDisplay(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(
      AUTH_API + 'Get_Userdatabyregid/'+id,
      httpOptions
    );  
  }

    DashboardData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Home',
      httpOptions
    );
  }

  Profile(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Profile',
      httpOptions
    );
  }

  UpdateProfile(value: {
    email: string;
    password: string;
    name: string;
    walletaddress: string;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Profile_Update',
      { 
        "email":value.email, 
        "password":value.password, 
        "name":value.name, 
        "walletaddress":value.walletaddress, 
      },
      httpOptions
    );
  }

  Referrals(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Directteam',
    httpOptions
  );   
}

Activation(value: {
  package: string;
  regid: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Activate',
    { 
    "package":value.package, 
    "regid":value.regid,  
  },
     httpOptions 
  );
}

Topup(value: {
  package: string;
  regid: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Topup',
    { 
    "package":value.package, 
    "regid":value.regid,  
  },
     httpOptions 
  );
}

ActivationData(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Activation_data',
    httpOptions
  );   
}

WalletTodayReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_TodayReport',
    httpOptions
  );   
}

WalletReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Report',
    httpOptions
  );   
}

TransferWallet(value: {
  amount: string;
  regid: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Wallet_Transefer',
    { 
    "amount":value.amount, 
    "regid":value.regid,  
  },
     httpOptions 
  );
}

SelfTransferWallet(value: {
  amount: number;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Wallet_SelfTransefer',
    { 
    "amount":value.amount,  
  },
     httpOptions 
  );
}

TransferWalletReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Transeferreport',
    httpOptions
  );   
}

RecivedWalletReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Receivereport',
    httpOptions
  );   
}

GetPackages(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_Packages',
    httpOptions
  );   
}

GetPckagesById(id:any){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Get_Packagedata/'+id,
    httpOptions
  );   
}

DepositWallet(value: { amount: string, note: string, transno: string }) {
   const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.post(
     AUTH_API + 'Deposite',
    {
      amount: value.amount,
      note: value.note,
      transno: value.transno,
    },
    httpOptions
  );
}

  DepositeData() {
     const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    }),
    };
      return this.http.get(AUTH_API + 'User_Deposites', httpOptions);
  }


}
