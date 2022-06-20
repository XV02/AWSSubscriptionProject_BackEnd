import { Injectable } from '@nestjs/common';
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
    return await createdEmail.save();
  }
}
