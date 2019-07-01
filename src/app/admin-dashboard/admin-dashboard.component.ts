import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../Models/User';
import { Task } from '../Models/Task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  usersLoaded = false;
  tasks: Task[] = [];
  tasksFlag: boolean[] = [];
  editFlags: boolean[] = [];
  taskEditForm: FormGroup;
  newText: string;
  newSolved: boolean;
  date: Date;
  addTaskFlag = false;
  usersLength = 0;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() {
    this.showUsers();
    this.taskEditForm = new FormGroup({
      text: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])),
      solved: new FormControl(false)
    });
  }


  showUsers() {
    this.service.GetUsers().subscribe(
      usersResponse => {
        const usersSize = usersResponse as User[];
        this.usersLength = usersSize.length;
        // console.log('All users: ', usersResponse);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < usersSize.length; i++) {
          this.users.push(usersResponse);
        }
      }, error => {
        if (error.status === 0) {
          alert('Service is not available, contact your Internet Service Provider!');
        } else {
          console.log('Service error: ', error.error.Message);
          alert(error.error.Message);
        }
      }, () => {
        setTimeout(() => {
          this.usersLoaded = true;
        }, 2000);
      }
    );
  }


  showTasks(userId: number, i: number) {
    this.addTaskFlag = false;
    for (let j = 0; j < this.usersLength; j++) {
      if (i !== j) {
        this.tasksFlag[j] = false;
      }
    }
    this.tasksFlag[i] = !this.tasksFlag[i];
    this.service.GetUser(userId).subscribe(
      data => {
        this.tasks = data.Tasks;
        console.log(this.tasks);
        console.log('kraj');
      }
    );
    console.log(userId, i);
    console.log(this.tasksFlag[i]);
  }

  editTask(taskId: number, i: number) {
    console.log(this.tasks);
    this.editFlags[i] = true;
    this.taskEditForm.patchValue({text: this.tasks[i].Text});
    this.taskEditForm.patchValue({solved: this.tasks[i].Solved});
    console.log(this.tasks[i].Date);
    this.date = new Date(this.tasks[i].Date);
  }

  saveTask(taskId: number, i: number) {
    const newText = this.taskEditForm.controls.text.value;
    const newSolved = this.taskEditForm.controls.solved.value;
    const newDate = this.date;

    console.log(newDate.toLocaleDateString());

    this.tasks[i].Text = newText;
    this.tasks[i].Solved = newSolved;
    this.tasks[i].Date = newDate;

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

  deleteTask(taskId: number) {
    this.service.DeleteTask(taskId).subscribe(
      () => {
        console.log('User update');
      },
      error => {
        if (error.status === 0) {
          alert('Service is not available, contact your Internet Service Provider!');
        } else {
          console.log('Service error: ', error.error.Message);
          alert(error.error.Message);
        }
      }, () => {
        alert('Task successfully deleted!');
        this.ngOnInit();
      });
  }

  newTask() {
    this.addTaskFlag = true;
  }
  addTask(newText, newSolved, newDate, userId: number) {
    console.log(newText, newSolved, newDate, userId);
    const userID = userId;

    this.service.CreateTask(new Task(newText, newSolved, newDate, userID)).subscribe(
      () => {
        console.log('Create task');
      }, error => {
        if (error.status === 0) {
          alert('Service is not available, contact your Internet Service Provider!');
        } else {
          console.log('Service error: ', error.error.Message);
          alert(error.error.Message);
        }
      }, () => {
        alert('Task successfully created!');
        this.newText = '';
        this.newSolved = false;
        this.service.GetUser(userId).subscribe(
          data => {
            this.tasks = data.Tasks;
            console.log(this.tasks);
            console.log('kraj');
          }
        );
      });
    this.addTaskFlag = false;
  }

}
