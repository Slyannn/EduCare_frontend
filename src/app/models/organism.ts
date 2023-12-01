import {Need} from "./need";
import {User} from "./user";

export class Organism {
  public id!: number;
  public logo!: string;
  public name!: string;
  public description!: string;
  public certificate!: string;
  public services! : Array<Need>;
  public user!: User;
}
