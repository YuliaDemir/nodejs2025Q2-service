import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { validate } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'rxjs';

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getAll(@Res() res: Response) {
        const users = this.userService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':id')
    getById(
        @Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string,
        @Res() res: Response
    ) {
        if (!validate(id)) return res.status(400).json({ message: 'Invalid userId format' });
        const user = this.userService.findById(id);
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
        }
        return res.status(HttpStatus.OK).json(user);
    }

    @Post()
    create(
        @Body() createUserDto: CreateUserDto,
        @Res() res: Response
    ) {
        res.status(HttpStatus.CREATED).json(this.userService.create(createUserDto));
    }

    @Put(':id')
    update(
        @Param('id', new ParseUUIDPipe({ 
            version: '4',
        })) id: string, 
        @Body() dto: UpdateUserDto,
        @Res() res: Response
    ): Omit<User, 'password'> {
        const user = this.userService.update(id, dto);
        if (!user) {
            res.status(HttpStatus.NOT_FOUND).json({ message: 'User does not found'})
            return;
        }
        res.status(HttpStatus.CREATED).json(user);
        return user;
    }
    
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', new ParseUUIDPipe({ 
            version: '4',
            errorHttpStatusCode: 400,
        })) id: string,): void {
        this.userService.remove(id);
    }

}
