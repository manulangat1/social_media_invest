import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EnvironmentDTO {
  @IsNotEmpty()
  @IsString()
  ndovuUrl: string;

  @IsNotEmpty()
  @IsString()
  env: string;

  @IsNotEmpty()
  @IsNumber()
  lockedOutPeriod: number;
}
