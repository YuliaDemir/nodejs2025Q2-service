import { Album } from './albums/entities/album.entity';
import { Artist } from './artists/entities/artist.entity';
import { Track } from './tracks/entities/track.entity';
import { User } from './users/entities/user.entity';

const db = {
  users: [] as User[],
  artists: [] as Artist[],
  albums: [] as Album[],
  tracks: [] as Track[],
  favorites: {
    artists: new Set<string>(),
    albums: new Set<string>(),
    tracks: new Set<string>(),
  },
};
