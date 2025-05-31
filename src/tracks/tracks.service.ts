import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { randomUUID } from 'crypto';
import { db } from 'src/db';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
    create(createTrackDto: CreateTrackDto): Track {
        const newTrack: Track = {
            id: randomUUID(),
            name: createTrackDto.name,
            artistId: createTrackDto.artistId,
            albumId: createTrackDto.albumId,
            duration: createTrackDto.duration
        };
        db.tracks.push(newTrack);
        return newTrack;
    }

    findAll(): Track[] {
        return db.tracks;
    }

    findById(id: string): Track {
        const track = db.tracks.find(track => track.id === id);
        if (!track) throw new NotFoundException('track Not found');
        return track;
    }

    update(id: string, updateDto: UpdateTrackDto) {
        const track = db.tracks.find(track => track.id === id);
        if (!track) throw new NotFoundException('track Not found');
        track.name = updateDto.name;
        track.artistId = updateDto.artistId;
        track.albumId = updateDto.albumId;
        track.duration = updateDto.duration;
        return track;
    }

    remove(id: string) {
        const index = db.tracks.findIndex(track => track.id === id);
        if (index === -1) throw new NotFoundException('track not found');
        db.tracks.splice(index, 1);
        return { message: 'track deleted' };
    }

}
