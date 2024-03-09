import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TravelResolver } from './travels/travels.resolver';
import { TravelsService } from './travels/travels.services';
import { UserResolver } from './users/users.resolver';
import { UsersService } from './users/users.services';
import DbService from './lib/db';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true
    }),
  ],
  providers: [TravelsService, TravelResolver, UsersService, UserResolver, DbService],
})

export class AppModule {}
