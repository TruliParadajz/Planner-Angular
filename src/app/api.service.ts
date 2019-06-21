import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './Models/User';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(public http: HttpClient) {}

    CheckUser(user: User) {
        // const header = new HttpHeaders();
        // header.set('Content-Type', 'application/json');

        // return this.http.post('http://localhost:60424/api/users/login', user, {headers: header});
        var buffer = user as any;
        return this.http.put('http://localhost:60424/api/users/login', buffer);
    }
    GetUser()
    {
        return this.http.get('http://localhost:60424/api/users');
    }

}
