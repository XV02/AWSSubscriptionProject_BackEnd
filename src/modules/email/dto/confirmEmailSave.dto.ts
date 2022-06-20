import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailResponseDto {
  @ApiProperty({
    description: 'Message',
  })
  message: string;

  @ApiProperty({
    description: 'ID of the inserted email',
  })
  id: string;
}
