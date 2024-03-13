import { Int, Field, InputType, } from '@nestjs/graphql';

@InputType()
export class Orders {
  @Field(() => Int)
  numOfSeats: number;

  @Field()
  id: string;
}

@InputType()
export class Checkout {
  @Field(() => Int)
  amount: number

  @Field(() => [Orders])
  orders: Orders[]

  @Field()
  email: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string

  @Field()
  email: string
}

@InputType()
export class CreateBooking {
  @Field()
  email: string

  @Field()
  travelId: string
  
  @Field(() => Int, {nullable: false})
  numOfSeats: number
}
