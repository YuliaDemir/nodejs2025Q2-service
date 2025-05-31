import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [TracksModule],
  controllers: [TracksController],
  providers: [TracksService]
})
export class TracksModule {}