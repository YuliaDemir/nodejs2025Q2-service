import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn({ type: 'timestamptz'})
  createdAt: number; // timestamp of creation

  @UpdateDateColumn({ type: 'timestamptz'})
  updatedAt: number; // timestamp of last update
}
