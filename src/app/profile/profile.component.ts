import { Component, OnInit, DoCheck } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../Models/User';

// export interface User {
//   Id?: number;
//   Name?: string;
//   Surname?: string;
//   Email?: string;
//   Password?: string;
//   Role?: string;
//   Tasks?: Task[];
// }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck {
  user: User;
  taskFlag = false;
  dataFetched = false;

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.onLoadProfile();
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
      }
    );
  }

}
