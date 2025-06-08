import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
      @InjectRepository(Album)
      private readonly albumRepository: Repository<Album>,
    ) {}
    
  async create(dto: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumRepository.create(dto);
    return await this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async findById(id: string): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new NotFoundException('album Not found');
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.albumRepository.preload({
      id,
      ...dto,
    });
    if (!album) throw new NotFoundException('album Not found');
    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId;
    return await this.albumRepository.save(album);
  }

  async remove(id: string) {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('album not found');
    return { message: 'album deleted' };
  }
}
