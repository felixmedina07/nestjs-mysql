import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity
  } from 'typeorm';

  @Entity('task')
  export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type:"varchar",length:20,nullable:false})
    title: string;

    @Column({type:"varchar",length:150,nullable:false})
    description: string;
  }