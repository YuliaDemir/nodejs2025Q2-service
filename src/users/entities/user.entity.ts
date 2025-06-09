import { Favorites } from 'src/favorites/entities/favorites.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @Column({ type: 'bigint' })
  createdAt: number; // timestamp of creation

  @Column({ type: 'bigint' })
  updatedAt: number; // timestamp of last update

  @OneToOne(() => Favorites, (favorite) => favorite.user, { nullable: true })
  favorite: Favorites;

  @BeforeInsert()
  setCreateTimestamp() {
    const now = Date.now();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setUpdateTimestamp() {
    this.createdAt = Number(this.createdAt);
    this.updatedAt = Date.now();
  }
}
