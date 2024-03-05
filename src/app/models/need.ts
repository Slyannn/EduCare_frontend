import {Organism} from "./organism";
import {Student} from "./student";
import {OrganismAdmin} from "./organismAdmin";

export class Need {
  public id!: number;
  public name!: string;
  public organismAdmins!: Array<OrganismAdmin>
  public students!: Array<Student>

}
