import {Need} from "./need";
import {User} from "./user";

export class Student {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public needs!: Need[];
  public user!: User;
  public university!: string;
}
