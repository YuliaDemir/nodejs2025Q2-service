import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(newTrack);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find({ relations: ['artist', 'album'] });
  }

  async findById(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({
      where: { id },
      relations: ['artist', 'album'],
    });
    if (!track) throw new NotFoundException('track Not found');
    return track;
  }

  async update(id: string, updateDto: UpdateTrackDto): Promise<Track> {
    const track = await this.trackRepository.preload({
      id,
      ...updateDto,
    });
    if (!track) throw new NotFoundException('track Not found');
    return await this.trackRepository.save(track);
  }

  async remove(id: string) {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('track not found');
    return { message: 'track deleted' };
  }
}
