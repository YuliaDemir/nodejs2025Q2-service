import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  async getAll() {
    return await this.favoritesService.findAll();
  }

  //TRACKS
  @Post('track/:id')
  async addTrackToFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
      }),
    )
    id: string,
  ) {
    return await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrackToFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
      }),
    )
    id: string,
  ) {
    return await this.favoritesService.removeTrack(id);
  }

  //ARTISTS
  @Post('artist/:id')
  async addArtistToFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
      }),
    )
    id: string,
  ) {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
      }),
    )
    id: string,
  ) {
    return await this.favoritesService.removeArtist(id);
  }

  //ALBUMS
  @Post('album/:id')
  async addAlbumToFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
      }),
    )
    id: string,
  ) {
    return await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
      }),
    )
    id: string,
  ) {
    return await this.favoritesService.removeAlbum(id);
  }
}
