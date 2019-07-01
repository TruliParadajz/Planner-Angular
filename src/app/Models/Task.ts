import { User } from './User';
export class Task {
    Id: number;
    Text: string;
    Solved: boolean;
    Date: Date;
    UserId: number;
    User: User;

    constructor(text?: string, solved?: boolean, date?: Date,
        userId?: number) {
        this.Text = text;
        this.Solved = solved;
        this.Date = date;
        this.UserId = userId;
}
}
