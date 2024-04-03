import {Need} from "./need";
import {User} from "./user";
import {Address} from "./address";
import {Review} from "./review";

export class Student {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public needs!: Need[];
  public user!: User;
  public address!: Address;
  public university!: string;
  public reviews!: Review[];
}
