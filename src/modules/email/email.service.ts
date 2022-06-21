import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmailResponseDto } from './dto/confirmEmailSave.dto';
import { CreateEmailDto } from './dto/email.dto';
import { EmailDocument } from './schemas/email.schema';

const MONGO_DUPLICATED_ERROR = 11000;

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('Email') private readonly emailModel: Model<EmailDocument>,
  ) {}

  async create(
    createEmailDto: CreateEmailDto,
  ): Promise<CreateEmailResponseDto> {
    const createdEmail = new this.emailModel(createEmailDto);
    try {
      const response = await createdEmail.save();
      return {
        message: 'Email registered successfully',
        id: response._id,
      };
    } catch (error) {
      if (error.code === MONGO_DUPLICATED_ERROR) {
        throw new HttpException(
          `Can't register duplicated email`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
