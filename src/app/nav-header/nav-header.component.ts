import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit, DoCheck {
 isUserLogged = false;
 isAdmin = false;

  constructor(private router: Router) { }

  ngOnInit() {
    // localStorage.setItem('login', 'false');
    // localStorage.removeItem('id');

    if (localStorage.getItem('login') === 'true') {
      this.isUserLogged = true;
    }

    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    }
  }

  ngDoCheck() {
    // provjera za prijavu
    if (localStorage.getItem('login') === 'true') {
      this.isUserLogged = true;
    } else {
      this.isUserLogged = false;
    }

    // provjera za admina
    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    // console.log('Memory leak');
  }

  onLogout() {
    localStorage.setItem('login', 'false');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.isUserLogged = false;
  }


}
