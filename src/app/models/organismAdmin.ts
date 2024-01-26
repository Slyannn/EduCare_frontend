import {Need} from "./need";
import {Address} from "./address";
import {Organism} from "./organism";


export class OrganismAdmin{
  public id!: number;
  public logo!: string;
  public name!: string;
  public website!: string;
  public description!: string;
  public organismEmail!: string;
  public phone!: string;
  public certificate!: string;
  public services! : Array<Need>;
  public address!: Address;
  public profile!: Organism;
}
