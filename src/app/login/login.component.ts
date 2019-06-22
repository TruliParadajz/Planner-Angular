import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // inputEmail: string;
  // inputPassword: string;
  loginForm: FormGroup;

  constructor(private service: ApiService) { }

  ngOnInit() {
    // definiranje atributa unutar forme i njihove kontrole, validacije
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]))
    });
  }

  onSubmit() {
    // definiranje konstanti za dohvaćanje vrijednosti email i password iz forme
    const userEmail = this.loginForm.controls.email.value;
    const userPassword = this.loginForm.controls.password.value;

    this.service.CheckUser(new User(0, '', '', userEmail, userPassword)). // pozivanje funkcije za provjeru korisnika iz baze
    subscribe( userResponse => {
      console.log('User response: ', userResponse);
    });

    // console.log(this.loginForm);
    // console.log('Email: ', this.loginForm.controls.email.value);
    // console.log('Password: ', this.loginForm.controls.password.value);

  }

}
