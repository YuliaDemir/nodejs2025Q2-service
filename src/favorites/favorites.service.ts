import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';
import { db } from 'src/db';
import { Track } from 'src/tracks/entities/track.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class FavoritesService {
    findAll(): { artists: Artist[], albums: Album[], tracks: Track[] } {
        return {
            artists: Array.from(db.favorites.artists).map(artistId => db.artists.find(artist => artist?.id === artistId))
                .filter((a): a is Artist => a !== undefined),
            albums: Array.from(db.favorites.albums).map(albumId => db.albums.find(album => album?.id === albumId))
                .filter((a): a is Album => a !== undefined),
            tracks: Array.from(db.favorites.tracks).map(trackId => db.tracks.find(track => track?.id === trackId))
                .filter((a): a is Track => a !== undefined),
        }
    }

    addTrack(id: string): Track {
        const track = db.tracks.find((track) => track.id === id);
        if (!track) throw new UnprocessableEntityException('track Not found');
        db.favorites.tracks.add(track.id);
        return track;
    }

    removeTrack(id: string): void {
        const removed = db.favorites.tracks.delete(id);
        if (!removed) throw new NotFoundException('track Not found');
    }

    addArtist(id: string): Artist {
        const artist = db.artists.find((artist) => artist.id === id);
        if (!artist) throw new UnprocessableEntityException('artist Not found');
        db.favorites.artists.add(artist.id);
        return artist;
    }

    removeArtist(id: string): void {
        const removed = db.favorites.artists.delete(id);
        if (!removed) throw new NotFoundException('artist Not found');
    }

    addAlbum(id: string): Album {
        const album = db.albums.find((album) => album.id === id);
        if (!album) throw new UnprocessableEntityException('album Not found');
        db.favorites.albums.add(album.id);
        return album;
    }

    removeAlbum(id: string): void {
        const removed = db.favorites.albums.delete(id);
        if (!removed) throw new NotFoundException('album Not found');
    }
}