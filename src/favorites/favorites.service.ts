import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Track } from 'src/tracks/entities/track.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Favorites } from './entities/favorites.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,

    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,

    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,

    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  private async getFavorites(): Promise<Favorites> {
    let favorites = await this.favoritesRepository.findOne({ where: {} });
    if (!favorites) {
      favorites = this.favoritesRepository.create({
        tracks: [],
        albums: [],
        artists: [],
      });
      await this.favoritesRepository.save(favorites);
    }
    return favorites;
  }

  async findAll() {
    const fav = await this.getFavorites();
    return {
      artists: fav.artists,
      albums: fav.albums,
      tracks: fav.tracks,
    };
  }

  async addTrack(id: string): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new UnprocessableEntityException('track Not found');

    const fav = await this.getFavorites();
    if (!fav.tracks.some((t) => t.id === id)) {
      fav.tracks.push(track);
      await this.favoritesRepository.save(fav);
    }
    return track;
  }

  async removeTrack(id: string): Promise<void> {
    const fav = await this.getFavorites();
    const index = fav.tracks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('track Not found');
    fav.tracks.splice(index, 1);
    await this.favoritesRepository.save(fav);
  }

  async addArtist(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new UnprocessableEntityException('artist Not found');

    const fav = await this.getFavorites();
    if (!fav.artists.some((a) => a.id === id)) {
      fav.artists.push(artist);
      await this.favoritesRepository.save(fav);
    }
    return artist;
  }

  async removeArtist(id: string): Promise<void> {
    const fav = await this.getFavorites();
    const index = fav.artists.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('artist Not found');
    fav.artists.splice(index, 1);
    await this.favoritesRepository.save(fav);
  }

  async addAlbum(id: string): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new UnprocessableEntityException('album Not found');

    const fav = await this.getFavorites();
    if (!fav.albums.some((a) => a.id === id)) {
      fav.albums.push(album);
      await this.favoritesRepository.save(fav);
    }
    return album;
  }

  async removeAlbum(id: string): Promise<void> {
    const fav = await this.getFavorites();
    const index = fav.albums.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('album Not found');
    fav.albums.splice(index, 1);
    await this.favoritesRepository.save(fav);
  }
}
