import { ObjectType, Field} from '@nestjs/graphql';
import { DefaultInfo } from 'src/types/objects';

@ObjectType()
export class User extends DefaultInfo {  
  @Field()
  email: string;
}