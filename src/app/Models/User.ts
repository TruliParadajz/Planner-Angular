import { Task } from './Task';
export class User {
    Id?: number;
    Name?: string;
    Surname?: string;
    Email?: string;
    Password?: string;
    Role?: string;
    Tasks?: Task[];

    // constructor(id: number, name: string, surname: string, email: string,
    //             password: string, role: string, tasks: Task[]) {
    //         this.Id = id;
    //         this.Name = name;
    //         this.Surname = surname;
    //         this.Email = email;
    //         this.Password = password;
    //         this.Role = role;
    //         this.Tasks = tasks;
    //     }

    // constructor( email: string, password: string) {
    //     this.Email = email;
    //     this.Password = password;
    // }

    constructor(id?: number, name?: string, surname?: string, email?: string,
                password?: string, role?: string, tasks?: Task[]) {
        this.Id = id;
        this.Name = name;
        this.Surname = surname;
        this.Email = email;
        this.Password = password;
        this.Role = role;
        this.Tasks = tasks;
    }


}
