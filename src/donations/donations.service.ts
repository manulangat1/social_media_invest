import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from '../db/entities/Donation.Entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../posts/dto/create.post.dto';
import { CreateDonationDTO } from './dto/create.donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation) private donationService: Repository<Donation>,
  ) {}

  async create(data: CreateDonationDTO) {
    // const { post } = data;
    const newDonation = await this.donationService.create({
      ...data,
    });
    return await this.donationService.save(newDonation);
  }
}
