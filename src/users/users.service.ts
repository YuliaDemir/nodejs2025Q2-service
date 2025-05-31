import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from 'src/db';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const newUser: User = {
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    db.users.push(newUser);
    const safeUser = { ...newUser };
    delete safeUser.password;
    return safeUser;
  }

  findAll(): Omit<User, 'password'>[] {
    return db.users.map((user) => {
      delete user.password;
      return user;
    });
  }

  findById(id: string): Omit<User, 'password'> {
    const user = db.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not found');
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  update(id: string, updateDto: UpdateUserDto) {
    const user = db.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not found');
    if (user.password !== updateDto.oldPassword)
      throw new ForbiddenException('The password is wrong!');

    user.password = updateDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();

    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  remove(id: string) {
    const index = db.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    db.users.splice(index, 1);
    return { message: 'User deleted' };
  }
}
