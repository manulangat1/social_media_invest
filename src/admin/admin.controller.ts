import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDTO } from './dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  @Public()
  async create(@Body() data: CreateAdminDTO) {
    return this.adminService.create(data);
  }

  // async login(@Body() data)
}
