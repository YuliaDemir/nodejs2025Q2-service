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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getAll() {
    return this.tracksService.findAll();
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
  ): Promise<Track> {
    return this.tracksService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateTrackDto): Promise<Track> {
    return this.tracksService.create(dto);
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
    @Body() dto: UpdateTrackDto,
  ): Promise<Track> {
    return this.tracksService.update(id, dto);
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
    this.tracksService.remove(id);
  }
}
