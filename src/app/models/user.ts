import {Address} from "./address";

export class User{
  public id!: number;
  public firstname!:string;
  public lastname!:string;
  public email!:string;
  public password!: string;
  public address!: Address;
  public roles!: Array<string>;

}
