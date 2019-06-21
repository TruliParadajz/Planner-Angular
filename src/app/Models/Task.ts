import { User } from './User';
export class Task {
    Id: number;
    Text: string;
    Sovled: boolean;
    Date: Date;
    UserId: number;
    User: User;
}
