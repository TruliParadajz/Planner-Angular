import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // inputEmail: string;
  // inputPassword: string;
  loginForm: FormGroup;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() {
    // definiranje atributa unutar forme i njihove kontrole, validacije
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]))
    });
  }

  onSubmit() {
    // definiranje konstanti za dohvaćanje vrijednosti email i password iz forme
    let userID = 0;
    let userRole = '';
    const userEmail = this.loginForm.controls.email.value;
    const userPassword = this.loginForm.controls.password.value;

    this.service.CheckUser(new User(0, '', '', userEmail, userPassword)). // pozivanje funkcije za provjeru korisnika iz baze
    subscribe( userResponse => {
      console.log('User response: ', userResponse);
      userID = userResponse.Id;
      userRole = userResponse.Role;
    }, error => {
      if (error.status === 0) {
        alert('Service is not available, contact your Internet Service Provider!');
      } else {
        console.log('Service error: ', error.error.Message);
        alert(error.error.Message);
      }
    }, () => {
      if (userRole === 'admin') {
        this.router.navigate(['/admin']);
        localStorage.setItem('role', 'admin');
      } else {
        this.router.navigate(['/user']);
        localStorage.setItem('role', 'user');
      }
      localStorage.setItem('login', 'true');
      localStorage.setItem('id', userID.toString());
      console.log('Logger: ', localStorage.getItem('login'));
    }
    );

  }


}
