import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmailResponseDto } from './dto/confirmEmailSave.dto';
import { CreateEmailDto } from './dto/email.dto';
import { EmailDocument } from './schemas/email.schema';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('Email') private readonly emailModel: Model<EmailDocument>,
  ) {}

  async create(createEmailDto: CreateEmailDto) {
    const createdEmail = new this.emailModel(createEmailDto);
    try {
      return await createdEmail.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          `Can't register duplicated email`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
