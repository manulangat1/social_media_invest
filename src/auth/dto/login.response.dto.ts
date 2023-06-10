import { User } from '../../db/entities/User.Entity';
import { BaseUserDTO } from './base.user.dto';

export class LoginResponseDTO {
  token: string;
  message: string;
  user_data: User | BaseUserDTO;
}
