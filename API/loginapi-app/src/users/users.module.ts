import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UsersController } from './users/users.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UserController, UsersController],
  providers: [UsersService]
})
export class UsersModule {}
