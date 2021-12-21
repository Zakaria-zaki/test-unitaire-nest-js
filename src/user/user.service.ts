import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: UserEntity[] = [
    {
      id: 1,
      email: '03zakaria@gmail.com',
      firstName: 'Zakaria',
      lastName: 'ATTAOUI',
      password: 'zakariaATTAOUI',
      dateOfBirth: '13/01/1998',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((item) => item.id === +id);
  }

  create(createCoffeeDto: any) {
    this.users.push(createCoffeeDto);
    return createCoffeeDto;
  }
}
