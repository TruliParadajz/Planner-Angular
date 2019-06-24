import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userExists = false;

  constructor(private service: ApiService) { }

  ngOnInit() { // doraditi patterne za password regex izrazi (pattern)
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]))
    });
  }

  onSubmit() {
    const name = this.registerForm.controls.firstName.value;
    const surname = this.registerForm.controls.lastName.value;
    const mail = this.registerForm.controls.email.value;
    const pass = this.registerForm.controls.password.value;

    // console.log('Register values: ', this.registerForm.value);

    this.service.CreateUser(new User(0, name, surname, mail, pass))
    .subscribe(registerResponse => {
      if (registerResponse === null) {
        this.userExists = true;
      }
      console.log('Register response: ', registerResponse);
    });
  }

}
