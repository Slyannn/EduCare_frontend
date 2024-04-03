import {Need} from "./need";
import {User} from "./user";
import {OrganismAdmin} from "./organismAdmin";
import {Review} from "./review";

export class Organism {
  public id!: number;
  public organismAdmin!: OrganismAdmin;
  public user!: User;
  public enable:boolean = false;
  public reviews!: Review[];
}
