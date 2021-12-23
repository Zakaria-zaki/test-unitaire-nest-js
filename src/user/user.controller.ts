import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { resolve } from 'dns/promises';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Get()
  findAll(@Query() paginationQuery) {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  /*
  getFirstName(@Param('id') id: string) {
    return this.userService.findOne(id).then((value) => {
      const firstName = value.firstName;
      console.log(firstName);
    });
  }

  getLastName(@Param('id') id: string) {
    return this.userService.findOne(id).then((value) => {
      const lastName = value.lastName;
      console.log(lastName);
    });
  }

  getPassword(@Param('id') id: string) {
    return this.userService.findOne(id).then((value) => {
      const password = value.password;
      console.log(password);
    });
  }


  getUserInformationForTests(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  */
}
