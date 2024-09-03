import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @ApiProperty({
    description: 'The name of the task',
    example: 'eat',
  })
  @Column({name: 'name', nullable: false, unique: true})
  readonly name: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'to not feel hungry',
  })
  @Column({name: 'description', nullable: false})
  readonly description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: 'completed',
  })
  @Column({name: 'status', nullable: false})
  readonly status: string;
}