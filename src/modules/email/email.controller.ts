import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmailResponseDto } from './dto/confirmEmailSave.dto';
import { CreateEmailDto } from './dto/email.dto';
import { EmailService } from './email.service';

@ApiTags('Email operations')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('save')
  @UsePipes(new ValidationPipe())
  async save(
    @Body() createEmailDto: CreateEmailDto,
  ): Promise<CreateEmailResponseDto> {
    return await this.emailService.create(createEmailDto);
  }
}
