import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {constructor(private readonly artistsService: ArtistsService) {}

    @Get()
    getAll() {
        return this.artistsService.findAll();
    }

    @Get(':id')
    getById(
        @Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string,
    ) {
        return this.artistsService.findById(id);
    }

    @Post()
    create(
        @Body() dto: CreateArtistDto,
    ) {
        return this.artistsService.create(dto);
    }

    @Put(':id')
    update(
        @Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string, 
        @Body() dto: UpdateArtistDto,
    ): Artist {
        return this.artistsService.update(id, dto);
    }
    
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string,): void {
        this.artistsService.remove(id);
    }
}
