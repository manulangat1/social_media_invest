import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { BaseUserDTO } from '../../auth/dto';
import { plainToClass } from 'class-transformer';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();
    const data = request.user;
    // return plainToClass(BaseUserDTO, data);
    return data.user;
  },
);
