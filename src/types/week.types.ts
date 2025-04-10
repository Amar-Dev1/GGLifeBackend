import { Task } from "./task.types";

export interface Week{
    week_id?:string;
    title:string;
    score:number;
    completed:false | true;
    userId: string;
    tasks?:Task[];
}

export interface SafeWeek{
    week_id?:string;
    title:string;
    score:number;
    completed:false | true;
    tasks?:Task[];
}