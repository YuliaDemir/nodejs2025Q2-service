import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async getById(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
      }),
    )
    id: string,
  ) {
    return this.albumsService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateAlbumDto) {
    return this.albumsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
      }),
    )
    id: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
      }),
    )
    id: string,
  ): Promise<void> {
    this.albumsService.remove(id);
  }
}
