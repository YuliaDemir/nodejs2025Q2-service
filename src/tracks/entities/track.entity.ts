import { Album } from "src/albums/entities/album.entity";
import { Artist } from "src/artists/entities/artist.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column('int')
  duration: number; // integer number

  @ManyToOne(() => Artist, (artist) => artist.tracks, { nullable: true, onDelete: 'SET NULL'})
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, { nullable: true, onDelete: 'SET NULL'})
  @JoinColumn({ name: 'albumId' })
  album: Album;
}
