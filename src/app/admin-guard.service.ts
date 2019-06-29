import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        const isAdmin = localStorage.getItem('role');
        if (isAdmin === 'admin') {
            return true;
        } else {
            this.router.navigate(['/login']);
            localStorage.setItem('login', 'false');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            return false;
        }
    }
}
