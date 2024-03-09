import { ObjectType, Int, Field, InputType, } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => Int)
  numOfSeats: number;
  
  @Field()
  id: string;
}

@ObjectType()
export class ErrorOccured {
  @Field()
  message: string;
}

@ObjectType()
export class CheckoutOrder {
  @Field({nullable: true})
  email: string;

  @Field(() => [Order], {nullable: true})
  orders: [Order];
}

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
  orders: [Orders]

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

@ObjectType()
export class DefaultInfo {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class Cart {
  @Field()
  email: string;

  @Field(() => [Order])
  orders: [Order];

  @Field()
  expireAt: Date;
}

@ObjectType()
export class User extends DefaultInfo {  
  @Field()
  email: string;
}
