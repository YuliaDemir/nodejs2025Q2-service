import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entities/favorites.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites, Artist, Track, Album])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
