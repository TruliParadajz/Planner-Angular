import { User } from './User';
export class Task {
    Id: number;
    Text: string;
    Solved: boolean;
    Date: Date;
    UserId: number;
    User: User;
}
