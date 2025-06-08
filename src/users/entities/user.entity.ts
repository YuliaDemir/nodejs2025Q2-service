import { Favorites } from 'src/favorites/entities/favorites.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: number; // timestamp of creation

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: number; // timestamp of last update

  @OneToOne(() => Favorites, (favorite) => favorite.user)
  favorite: Favorites;
}
