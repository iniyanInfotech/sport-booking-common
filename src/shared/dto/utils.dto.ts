import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UTILS_MODULES } from "../enum/utils.enum";

export class UtilsDto {
  @IsEnum(UTILS_MODULES, {
    message: `Values must be one of these ${Object.values(UTILS_MODULES).join(
      ","
    )}`,
  })
  readonly module: UTILS_MODULES;

  @IsString({ message: "Content must be a string" })
  @IsNotEmpty({ message: "Content cannot be emtpy" })
  readonly content: string;
}
