import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { ApiPageResponse } from 'src/page/api-page-response.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
// @ApiExtraModels(Page)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(JwtAuthGuard) // 🔐
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('page')
  @ApiPageResponse(UserEntity)
  async findPage(@Query() connectionArgs: ConnectionArgs) {
    return this.usersService.findPage(connectionArgs);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // 🔐
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // 🔐
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}
