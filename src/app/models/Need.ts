import {Organism} from "./organism";

export class Need {
  public id!: number;
  public name!: string;
  public organisms!: Array<Organism>

  //contructor
  constructor(id: number, name: string, organisms: Array<Organism>) {
    this.id = id;
    this.name = name;
    this.organisms = organisms;
  }


}
