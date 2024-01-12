import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorDto {
  @ApiProperty({
    type: 'number',
    example: 500,
    description: 'Status code error',
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    example: 'Internal Server Error',
    description: 'Description type of the error',
  })
  error: string;

  @ApiProperty({
    type: 'string',
    example: 'An error trace is displayed',
    description: 'Message error description',
  })
  message: string;
}
