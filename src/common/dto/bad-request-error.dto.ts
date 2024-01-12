import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorDto {
  @ApiProperty({
    type: 'number',
    example: 400,
    description: 'Status code error',
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    example: 'Bad Request',
    description: 'Description type of the error',
  })
  error: string;

  @ApiProperty({
    type: 'string',
    example: 'Bad Request Error',
    description: 'Message error description',
  })
  message: string;
}
