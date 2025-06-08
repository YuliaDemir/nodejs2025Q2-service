import { Album } from "src/albums/entities/album.entity";
import { Artist } from "src/artists/entities/artist.entity";
import { Track } from "src/tracks/entities/track.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[];

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Artist[];
}
