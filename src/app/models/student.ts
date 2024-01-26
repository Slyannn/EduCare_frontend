import {Need} from "./need";
import {User} from "./user";
import {Address} from "./address";

export class Student {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public needs!: Need[];
  public user!: User;
  public address!: Address;
  public university!: string;
}
