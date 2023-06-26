import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../db/entities/Admin.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async create(data: any) {
    const newAdmin = await this.adminRepository.create(data);
    return await this.adminRepository.save(newAdmin);
  }

  async getByEmail(filters?: Partial<Admin>) {
    return await this.adminRepository.find({
      where: filters,
    });
  }

  //   async get() {}

  // async update ()
}
