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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const newUser = this.userRepository.create({
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
    });
    const saved = await this.userRepository.save(newUser);
    const safeUser = { ...saved };
    delete safeUser.password;
    return safeUser;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Not found');
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  async update(
    id: string,
    updateDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Not found');
    if (user.password !== updateDto.oldPassword)
      throw new ForbiddenException('The password is wrong!');

    user.password = updateDto.newPassword;
    user.version++;
    await this.userRepository.save(user);

    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.remove(user);
    return { message: 'User deleted' };
  }
}
