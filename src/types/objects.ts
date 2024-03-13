import { createUnionType, ObjectType, Int, Field } from '@nestjs/graphql';

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
    @Field({ nullable: true })
    email: string;

    @Field(() => [Order], { nullable: true })
    orders: Order[];
}


@ObjectType()
export class DefaultInfo {
    @Field()
    id: string;

    @Field({nullable: true})
    name?: string;
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

export const CartorOrderUnion = createUnionType({
    name: 'createUnionType',
    types: () => [Order, Cart],
    resolveType: () => [Order] || Cart
});
