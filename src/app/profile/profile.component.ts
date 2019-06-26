import { Component, OnInit, DoCheck } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../Models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck {
  user: User;
  taskFlag = false;
  dataFetched = false;
  userEditForm: FormGroup;
  editFlag = false;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() {
    this.onLoadProfile();
    this.userEditForm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)]))
    });
  }

  ngDoCheck() {
    if (this.user) {
      this.dataFetched = true;
    }
  }


  onLoadProfile() {
    const id = +localStorage.getItem('id');
    this.service.GetUser(id).subscribe(
      data => {
        if (data.Tasks.length < 1) {
          this.taskFlag = true;
        }
        this.user = {
          Id: id,
          Name: data.Name,
          Surname: data.Surname,
          Email: data.Email,
          Tasks: data.Tasks
        };
        console.log('Tasks:');
        console.log(data.Tasks);
      }
    );
  }

  onEditPress() {
    this.userEditForm.patchValue({password: ''});
    this.editFlag = true;
  }

  onUpdateUser() {
    const id = +localStorage.getItem('id');
    this.editFlag = false;
    const newPassword = this.userEditForm.controls.password.value;

    this.service.UpdateUser(id, newPassword)
    .subscribe( () => {
      console.log('User update');
    }, error => {
      if (error.status === 0) {
        alert('Service is not available, contact your Internet Service Provider!');
      } else {
        console.log('Service error: ', error.error.Message);
        alert(error.error.Message);
      }
    }, () => {
      alert('Password successfully updated!');
    }
    );
  }

  onDeleteUser() {
    const id = +localStorage.getItem('id');
    this.service.DeleteUser(id).subscribe(() => {
      console.log('User delete');
    }, error => {
      if (error.status === 0) {
        alert('Service is not available, contact your Internet Service Provider!');
      } else {
        console.log('Service error: ', error.error.Message);
        alert(error.error.Message);
      }
    }, () => {
      alert('User successfully removed!');
      setTimeout(() => {
        this.router.navigate(['/login']);
        localStorage.removeItem('login');
        localStorage.removeItem('id');
      }, 2000);
    });
  }

}
