import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../service/user.service';
import { HttpHeaders } from '@angular/common/http';
import { RegisterDTO } from '../dtos/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  // Declare variables corresponding to data fields in the form
  phone: string;
  password: string;
  retypePassword: string;
  fullname: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor( private router: Router, private UserService: UserService){
    this.phone ="7404097563";
    this.password ="12345676543";
    this.retypePassword ="12345676543";
    this.fullname = "test 1";
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

    

    const RegisterDTO:RegisterDTO = {
      "fullname": this.fullname,
      "phone_number": this.phone,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth, 
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 2
    }
    
    this.UserService.register(RegisterDTO).subscribe({
      next: (response: any) => {
        debugger
        this.router.navigate(['/login']);          
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {          
        alert(`Cannot register, error: ${error.error}`)          
      }
    })

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

