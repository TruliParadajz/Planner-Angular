import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  User: User = {
    Name : "Željko",
    Surname : "Hocenski",
    Email : "hoc@gmail.com",
    Role : "user",
    Password : "12345",
    Id : 8
  };
  inputEmail: string;
  inputPassword: string;

  constructor(private service: ApiService) { }

  ngOnInit()
  {
    //console.log(this.service.GetUser);
    this.service.GetUser().subscribe(posts => {
      console.log(posts);
    })
  }

  onSubmit(inputEmail, inputPassword) {
    this.User.Email = inputEmail;
    this.User.Password = inputPassword;
    
    this.service.CheckUser(this.User).subscribe(posts => {
      console.log(posts);
    })


    //console.log('Email, lozinka: ', inputEmail, inputPassword);

  }

}
