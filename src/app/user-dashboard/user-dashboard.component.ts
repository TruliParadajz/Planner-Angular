import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { Task } from '../Models/Task';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  tasks: Task[];
  user: User;
  taskFlag = false;
  dataFetched = false;

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.onLoadDashboard();
  }
  
  ngDoCheck() {
    if (this.user) {
      this.dataFetched = true;
    }
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
      }
    );
  }
}
