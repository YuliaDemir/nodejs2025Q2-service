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
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async getAll() {
    return this.artistsService.findAll();
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
    return this.artistsService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateArtistDto) {
    return this.artistsService.create(dto);
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
    @Body() dto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistsService.update(id, dto);
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
    await this.artistsService.remove(id);
  }
}
