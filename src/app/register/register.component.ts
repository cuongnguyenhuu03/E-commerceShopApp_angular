import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  // Declare variables corresponding to data fields in the form
  phone: String;
  password: String;
  retypePassword: String;
  fullname: String;
  address: String;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor(private http: HttpClient, private router: Router){
    this.phone ="7404617563";
    this.password ="12345676543";
    this.retypePassword ="12345676543";
    this.fullname = "MonKey D Lufy";
    this.address = "Japan";
    this.isAccepted = false;
    this.dateOfBirth = new Date;
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    // inject 

  }

  onPhoneChange(){
    console.log(`phone number typed" ${this.phone}`)
    // validate phone number 
  }

  register() {
    const message = 
          `phone: ${this.phone}` +
          `password :  ${this.password}`+
          `retypePassword :  ${this.retypePassword}` + 
          `fullname :  ${this.fullname}` + 
          `dateOfBirth :  ${this.dateOfBirth}` + 
          `address :  ${this.address}` + 
          `isAccepted :  ${this.isAccepted}`;

    const apiUrl = "http://localhost:8090/api/v1/users/register"

    const registerData = {
      "fullname": this.fullname,
      "phone_number": this.phone,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth, 
      "facebook_account_id": "0",
      "google_account_id": "0",
      "role_id": "2"
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    console.log(registerData);
    
    // post
    this.http.post(apiUrl, registerData, {headers}, )
      .subscribe({
        next: (response: any) => {
          debugger
          this.router.navigate(['/login']);
        },
        complete: () => {
          debugger
        },
        error: (error: any) => {
          alert(`Can not register, error: ${error.error}`)
          debugger
        }
      });
    }
  

  // check password match
  checkPasswordMatch(){
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMisMatch': true});
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge() {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())){
      age--;
    }

    if(age < 18 ){
      this.registerForm.form.controls['dateOfBirth'].setErrors({'invalidAge': true});
    }else {
      this.registerForm.form.controls['dateOfBirth'].setErrors(null);
    }

  }
  
}

