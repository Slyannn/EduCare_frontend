import {Organism} from "./organism";
import {Student} from "./student";

export class User{
  public id!: number;
  public email!:string;
  public password!: string;
  public roles!: string[];
  public organism!: Organism;
  public student!: Student;
  public verified!: boolean;
}
