import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor(){
    this.phone ="";
    this.password ="";
    this.retypePassword ="";
    this.fullname = "";
    this.address = "";
    this.isAccepted = false;
    this.dateOfBirth = new Date;
    this.dateOfBirth.setFullYear (this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneChange(){
    console.log(`phone number typed" ${this.phone}`)
    // validate phone number 
  }

  register() {
    const message = 
          `phone: ${this.phone}` +
          `password :  ${this.phone}`+
          `retypePassword :  ${this.retypePassword}` + 
          `fullname :  ${this.fullname}` + 
          `dateOfBirth :  ${this.dateOfBirth}` + 
          `address :  ${this.address}` + 
          `isAccepted :  ${this.isAccepted}`;
    alert(message);
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
