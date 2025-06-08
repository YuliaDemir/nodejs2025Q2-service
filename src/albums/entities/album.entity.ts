import { Artist } from "src/artists/entities/artist.entity";
import { Track } from "src/tracks/entities/track.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column('int')
  year: number;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => Artist, (artist) => artist.albums, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
