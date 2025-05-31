import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { TracksService } from './tracks.service';
import { validate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

    @Get()
    getAll() {
        return this.tracksService.findAll();
    }

    @Get(':id')
    getById(
        @Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string,
    ) {
        return this.tracksService.findById(id);
    }

    @Post()
    create(
        @Body() dto: CreateTrackDto,
    ) {
        return this.tracksService.create(dto);
    }

    @Put(':id')
    update(
        @Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string, 
        @Body() dto: UpdateTrackDto,
    ): Track {
        return this.tracksService.update(id, dto);
    }
    
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string,): void {
        this.tracksService.remove(id);
    }}
