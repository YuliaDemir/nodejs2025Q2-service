import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { randomUUID } from 'crypto';
import { db } from 'src/db';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
    create(dto: CreateArtistDto): Artist {
            const newArtist: Artist = {
                id: randomUUID(),
                name: dto.name,
                grammy: dto.grammy,
            };
            db.artists.push(newArtist);
            return newArtist;
        }
    
        findAll(): Artist[] {
            return db.artists;
        }
    
        findById(id: string): Artist {
            const artist = db.artists.find(artist => artist.id === id);
            if (!artist) throw new NotFoundException('artist Not found');
            return artist;
        }
    
        update(id: string, dto: UpdateArtistDto) {
            const artist = db.artists.find(artist => artist.id === id);
            if (!artist) throw new NotFoundException('artist Not found');
            artist.name = dto.name;
            artist.grammy = dto.grammy;
            return artist;
        }
    
        remove(id: string) {
            const index = db.artists.findIndex(artist => artist.id === id);
            if (index === -1) throw new NotFoundException('artist not found');

            db.tracks.forEach(track => {
                if (track.artistId === id) {
                    track.artistId = null;
                }
            });

            db.albums.forEach(album => {
                if (album.artistId === id) {
                    album.artistId = null;
                }
            });

            db.artists.splice(index, 1);
            return { message: 'artist deleted' };
        }
    
}
