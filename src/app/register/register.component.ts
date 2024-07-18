import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // khai báo các biến tương ứng với các trường dữ liệu trong form 
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
}
