import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), AuthModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
