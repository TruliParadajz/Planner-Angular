import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // User: User;
  inputEmail: string;
  inputPassword: string;

  constructor(private service: ApiService) { }

  ngOnInit() {
  }

  onSubmit() {
   // this.User.Email = this.inputEmail;
    // this.User.Password = this.inputPassword;

    // const response = this.service.CheckUser(this.User);
    // console.log('Response: ', response);

    console.log('Email, lozinka: ', this.inputEmail, this.inputPassword);

  }

}
