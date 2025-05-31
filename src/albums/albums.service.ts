import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { db } from 'src/db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
    create(dto: CreateAlbumDto): Album {
            const newAlbum: Album = {
                id: randomUUID(),
                name: dto.name,
                year: dto.year,
                artistId: dto.artistId,
            };
            db.albums.push(newAlbum);
            return newAlbum;
        }
    
        findAll(): Album[] {
            return db.albums;
        }
    
        findById(id: string): Album {
            const album = db.albums.find(album => album.id === id);
            if (!album) throw new NotFoundException('album Not found');
            return album;
        }
    
        update(id: string, dto: UpdateAlbumDto) {
            const album = db.albums.find(album => album.id === id);
            if (!album) throw new NotFoundException('album Not found');
            album.name = dto.name;
            album.year = dto.year;
            album.artistId = dto.artistId;
            return album;
        }
    
        remove(id: string) {
            const index = db.albums.findIndex(album => album.id === id);
            if (index === -1) throw new NotFoundException('album not found');

            db.tracks.forEach(track => {
                if (track.albumId === id) {
                    track.albumId = null;
                }
            });

            db.albums.splice(index, 1);
            return { message: 'album deleted' };
        }
    }
