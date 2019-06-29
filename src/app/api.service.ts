import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './Models/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './Models/Task';

const baseUrl = 'http://localhost:60424/api/';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(public http: HttpClient) {}

     CheckUser(user: User): Observable<User> {
        const header = new HttpHeaders();
        header.set('Content-Type', 'application/json');
        return this.http.post<User>(baseUrl + 'users/login', user, {headers: header});
    }

    GetUsers() {
        return this.http.get(baseUrl + 'users');
    }


    CreateUser(user: User): Observable<User> {
        const header = new HttpHeaders();
        header.set('Content-Type', 'application/json');
        try {
            const response = this.http.post<User>(baseUrl + 'users', user, {headers: header});
            return response;
        } catch {
            return null;
        }
    }


    GetUser(id: number): Observable<User> {
        return this.http.get<User>(baseUrl + 'users/' + id);
    }

    UpdateUser(id: number, password: string): Observable<string> {
        try {
            const response = this.http.put<string>(baseUrl + 'users/' + id + '/' + password, {});
            return response;
        } catch {
            return null;
        }
    }

    DeleteUser(id: number): Observable<string> {
        try {
            const response = this.http.delete<string>(baseUrl + 'users/' + id, {});
            return response;
        } catch {
            return null;
        }
    }

    UpdateTask(task: Task): Observable<Task> {
        const header = new HttpHeaders();
        header.set('Content-Type', 'application/json');
        try {
            const response = this.http.put<Task>(baseUrl + 'tasks', task);
            return response;
        } catch {
            return null;
        }
    }

}
