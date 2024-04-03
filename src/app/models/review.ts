import {Organism} from "./organism";
import {Student} from "./student";

export class Review{
  id!:number;
  content!:string;
  note!:string;
  organism_id!: number;
  author_id!: number;
  organism!: Organism;
  author!: Student;
}
