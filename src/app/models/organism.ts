import {Need} from "./need";
import {User} from "./user";
import {OrganismAdmin} from "./organismAdmin";

export class Organism {
  public id!: number;
  public organismAdmin!: OrganismAdmin;
  public user!: User;
}
