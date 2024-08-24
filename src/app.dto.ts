import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({
    description: 'The name of the task',
    example: 'eat',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'to not feel hungry',
  })
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: 'completed',
  })
  status: string;
}
