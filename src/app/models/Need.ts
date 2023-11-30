import {Organism} from "./organism";

export interface Need {
  id: number;
  name: string;
  organisms: Array<Organism>;
}
