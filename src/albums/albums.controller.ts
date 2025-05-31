import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}
    
    @Get()
    getAll() {
        return this.albumsService.findAll();
    }

    @Get(':id')
    getById(
        @Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string,
    ) {
        return this.albumsService.findById(id);
    }

    @Post()
    create(
        @Body() dto: CreateAlbumDto,
    ) {
        return this.albumsService.create(dto);
    }

    @Put(':id')
    update(
        @Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string, 
        @Body() dto: UpdateAlbumDto,
    ): Album {
        return this.albumsService.update(id, dto);
    }
    
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string,): void {
        this.albumsService.remove(id);
    }
}
