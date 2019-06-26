import { Component, OnInit, DoCheck } from '@angular/core';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import { User } from '../Models/User';
import { Task } from '../Models/Task';
import { ApiService } from '../api.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, DoCheck {
  tasks: Task[];
  user: User;
  taskFlag = false;
  dataFetched = false;
  editFlags: boolean[] = [];
  taskEditForm: FormGroup;

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.onLoadDashboard();
    this.taskEditForm = new FormGroup({
      text: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])),
      solved: new FormControl(false)
    });   
  }  

  onLoadDashboard() {
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
        this.tasks = data.Tasks;             
        console.log(this.tasks);
        console.log("kraj");
      }
    );
  }

  ngDoCheck() {
    if (this.user) {
      this.dataFetched = true;
    }
  }

  editTask(taskId: number, i: number){
    console.log(this.tasks);
    this.editFlags[i] = true;
    this.taskEditForm.patchValue({text: this.tasks[i].Text});
    this.taskEditForm.patchValue({solved: this.tasks[i].Solved});
  }

  saveTask(taskId: number, i: number)
  {
    const newText = this.taskEditForm.controls.text.value;
    const newSolved = this.taskEditForm.controls.solved.value;

    this.tasks[i].Text = newText;
    this.tasks[i].Solved = newSolved;

    this.service.UpdateTask(this.tasks[i]).subscribe(
      () => {
        console.log('User update');
      }, error => {
        if (error.status === 0) {
          alert('Service is not available, contact your Internet Service Provider!');
        } else {
          console.log('Service error: ', error.error.Message);
          alert(error.error.Message);
        }
      }, () => {
        alert('Task successfully updated!');
      });
    this.editFlags[i] = false;
  }

}
