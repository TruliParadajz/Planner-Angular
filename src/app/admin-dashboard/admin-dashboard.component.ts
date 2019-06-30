import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../Models/User';
import { Task } from '../Models/Task';

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

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.showUsers();
  }


  showUsers() {
    this.service.GetUsers().subscribe(
      usersResponse => {
        const test = usersResponse as User[];
        // console.log('All users: ', usersResponse);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < test.length; i++) {
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
    this.tasksFlag[i] = !this.tasksFlag[i];
    this.service.GetUser(userId).subscribe(
      data => {
        this.tasks = data.Tasks;             
        console.log(this.tasks);
        console.log("kraj");
      }
    );
    console.log(userId, i);
    console.log(this.tasksFlag[i]);
  }
  

}
