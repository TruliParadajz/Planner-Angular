import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  // userExists = false;
  successMessage = 'You have been successfully registered, redirecting to login page...';
  successRegisterFlag = false;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() { // doraditi patterne za password regex izrazi (pattern)
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.compose([Validators.required,
        Validators.minLength(2), Validators.pattern('(^[A-Z][a-ž]*\\s)*[A-Z][a-ž]*')])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2),
        Validators.pattern('(^[A-Z][a-ž]*\\s)*[A-Z][a-ž]*')])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)]))
    });
  }

  onSubmit() {
    const name = this.registerForm.controls.firstName.value;
    const surname = this.registerForm.controls.lastName.value;
    const mail = this.registerForm.controls.email.value;
    const pass = this.registerForm.controls.password.value;

    // console.log('Register values: ', this.registerForm.value);

    this.service.CreateUser(new User(0, name, surname, mail, pass, 'user'))
    .subscribe(registerResponse => {
      // if (registerResponse === null) {
      //   this.userExists = true;
      //   console.log('Register Flag: ', this.userExists);
      // }
      console.log('Register response: ', registerResponse);
    }, error => {
      if (error.status === 0) {
        alert('Service is not available, contact your Internet Service Provider!');
      } else {
        console.log('Service error: ', error.error.Message);
        alert(error.error.Message);
      }
    }, () => {
        this.successRegisterFlag = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
    }
    );
  }

}
