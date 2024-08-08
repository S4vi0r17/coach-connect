import { ExerciseLevel } from '../interfaces/excercise-lever.interface';

export class CreateClientDto {
  name: string;

  email: string;

  phone: number;

  weight: number;

  height: number;

  exerciseLevel: ExerciseLevel;

  trainer?: string;

  note?: string;
}
