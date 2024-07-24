import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginResponse } from 'src/app/responses/user/Login.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber : string = '0799975010';
  password: string = '123456';
  
  constructor( private router: Router, private UserService: UserService){
  }  

  onPhoneNumberChange(){
    console.log(`phone number typed" ${this.phoneNumber}`)
    // validate phone number 
  }

  login() {
    const message = 
          `phone: ${this.phoneNumber}` +
          `password :  ${this.password}`;

    const LoginDTO: LoginDTO = {
      "phone_number": this.phoneNumber,
      "password": this.password
    }
    
    this.UserService.login(LoginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger
        const {token} = response
        //this.router.navigate(['/login']);          
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {          
        alert(`Cannot login, error: ${error.error}`)          
      }
    })
  }
}
