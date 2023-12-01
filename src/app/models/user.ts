import {Address} from "./address";
import {Organism} from "./organism";
import {Student} from "./student";

export class User{
  public id!: number;
  public email!:string;
  public password!: string;
  public address!: Address;
  public roles!: string[];
  public organism!: Organism;
  public student!: Student;

}
