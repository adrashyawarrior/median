import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login(email: string, password: string): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        // TODO use a library like bcrypt to hash and compare your passwords
        // https://github.com/kelektiv/node.bcrypt.js#readme
        const passwordValid = user.password === password;

        if (!passwordValid) {
            throw new UnauthorizedException('Invalid Password');
        }

        return {
            accessToken: this.jwtService.sign({ userId: user.id })
        };
    }

    validateUser(userId: string) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
}
