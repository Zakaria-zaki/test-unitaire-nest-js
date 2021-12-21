import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('/')
  findAll() {
    return 'This action returns all users';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} user`;
  }
}
