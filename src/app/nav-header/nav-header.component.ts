import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit, DoCheck {
 isUserLogged = false;

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.setItem('login', 'false');
    localStorage.removeItem('id');
    if (localStorage.getItem('login') === 'true') {
      this.isUserLogged = true;
    }
    // else {
    //   localStorage.setItem('login', 'false');
    //   this.isUserLogged = false;
    // }
  }

  ngDoCheck() {
    if (localStorage.getItem('login') === 'true') {
      this.isUserLogged = true;
    }
    // else {
    //   this.isUserLogged = false;
    //   this.router.navigate(['/login']);
    // }
    // console.log('Memory leak');
  }

  onLogout() {
    localStorage.setItem('login', 'false');
    localStorage.removeItem('id');
    this.isUserLogged = false;
  }


}
