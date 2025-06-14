import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      id: randomUUID(),
      login: createUserDto.login,
      password: hashedPassword,
    });
    const saved = await this.userRepository.save(newUser);
    const safeUser = {
      ...saved,
      createdAt: Number(saved.createdAt),
      updatedAt: Number(saved.updatedAt),
    };
    delete safeUser.password;
    safeUser.version = Number(safeUser.version);
    return safeUser;
  }

  async findAll(): Promise<ReturnUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findById(id: string): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Not found');
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Not found');

    const isOldPasswordCorrect = await bcrypt.compare(updateDto.oldPassword, user.password);

    if (!isOldPasswordCorrect)
      throw new ForbiddenException('The password is wrong!');

    user.password = await bcrypt.hash(updateDto.newPassword, 10);
    user.version++;
    await this.userRepository.save(user);

    const safeUser = { ...user };
    safeUser.createdAt = Number(safeUser.createdAt);
    safeUser.updatedAt = Number(safeUser.updatedAt);
    delete safeUser.password;
    return safeUser;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['favorite'],
    });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.remove(user);
    return { message: 'User deleted' };
  }
}
