import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  backToLogin() {
    this.router.navigate(['/login']);
    localStorage.setItem('login', 'false');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
  }
}
