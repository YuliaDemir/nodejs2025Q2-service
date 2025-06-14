import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async signup(login: string, password: string) {
        const existing = await this.userRepo.findOne({ where: { login } });
        if (existing) {
            throw new BadRequestException('User with this login already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepo.create({
            login,
            password: hashedPassword,
        });

        const saveUser = await this.userRepo.save(newUser);

        return { id:  saveUser.id };
    }

    async login(login: string, password: string) {
        const user = await this.userRepo.findOne({ where: { login } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid login or wrong password');
        }

        return this.generateTokens(user);
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.userRepo.findOne({
                where: { id: payload.userId, login: payload.login },
            });

            if (!user) throw new UnauthorizedException();

            return this.generateTokens(user);
        } catch (e) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

    private generateTokens (user: User) {
        const payload = { userId: user.id, login: user.login};

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
