import { Album } from './albums/entities/album.entity';
import { Artist } from './artists/entities/artist.entity';
import { Favorites } from './favorites/entities/favorites.entity';
import { Track } from './tracks/entities/track.entity';
import { User } from './users/entities/user.entity';

export const db = {
    users: [] as User[],
    artists: [] as Artist[],
    albums: [] as Album[],
    tracks: [] as Track[],
    favorites:{
        artists: [] as string[],
        albums: [] as string[],
        tracks: [] as string[],
    }
}