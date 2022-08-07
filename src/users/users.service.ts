import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findPage(connectionArgs: ConnectionArgs) {
    return findManyCursorConnection(
      // 👇 args contain take, skip and cursor
      (args) => this.prisma.user.findMany(args),
      () => this.prisma.user.count(),
      connectionArgs, // 👈 returns all product records
    );
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id: id } });
  }


}
