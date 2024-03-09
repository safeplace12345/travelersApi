import { ObjectType, Int, Field } from '@nestjs/graphql';
import { DefaultInfo } from 'src/users/users.entity';

@ObjectType()
class Moods {
  @Field(() => Int)
  nature: number;
  @Field(() => Int)
  relax: number;
  @Field(() => Int)
  history: number;
  @Field(() => Int)
  culture: number;
  @Field(() => Int)
  party: number;
}

@ObjectType()
export class Travel extends DefaultInfo {
  @Field(() => Int)
  price: number;

  @Field()
  slug: string;

  @Field()
  description: string;

  @Field()
  startingDate: string;

  @Field()
  endingDate: string;

  @Field({ nullable: true })
  confirmed?: boolean;

  @Field()
  moods: Moods;
}
