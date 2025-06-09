import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(dto: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistRepository.create(dto);
    const art = await this.artistRepository.save(newArtist);
    return art;
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new NotFoundException('artist Not found');
    return artist;
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.artistRepository.preload({
      id,
      ...dto,
    });
    if (!artist) throw new NotFoundException('artist Not found');
    artist.name = dto.name;
    artist.grammy = dto.grammy;
    return await this.artistRepository.save(artist);
  }

  async remove(id: string) {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('artist not found');
    return { message: 'artist deleted' };
  }
}
