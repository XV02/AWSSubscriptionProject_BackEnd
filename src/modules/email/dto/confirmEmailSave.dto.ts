import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomResponseDto {
  @ApiProperty({
    description: 'Message',
  })
  message: string;

  @ApiProperty({
    description: 'ID of the inserted email',
  })
  id: string;
}
