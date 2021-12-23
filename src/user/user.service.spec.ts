import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
      ],
    }).compile();

    //service = module.get<UserService>(UserService);
    service = await module.resolve(UserService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when user with ID exists', () => {
      it('should return the user object', async () => {
        const userId = '1';
        const expectedUser = {};

        userRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findOne(userId);
        expect(user).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const userId = '1';
        userRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(userId);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect(e.message).toEqual(`User #${userId} not found`);
        }
      });
    });
  });
});
