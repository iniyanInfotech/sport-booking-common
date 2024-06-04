import { IsNotEmpty, IsString } from 'class-validator';

export class FaqDto {
  @IsString({ message: "FAQ title must be a string" })
  @IsNotEmpty({ message: "FAQ title cannot be emtpy" })
  readonly title: string;

  @IsString({ message: "FAQ title must be a string" })
  @IsNotEmpty({ message: "FAQ title cannot be emtpy" })
  readonly description: string;
}