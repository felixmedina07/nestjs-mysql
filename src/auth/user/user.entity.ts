import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity
  } from 'typeorm';

  @Entity('users')
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type:"varchar",length:30,nullable:false})
    username: string;

    @Column({type:"varchar",length:30,nullable:false, unique:false})
    email: string;

    @Column({type:"varchar",length:100,nullable:false})
    password: string;
  }