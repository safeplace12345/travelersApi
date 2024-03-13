import { UsersService } from "./users.services";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import {
    CheckoutOrder,
    Cart
} from 'src/types/objects';
import {
    CreateUserInput,
    CreateBooking,
    Checkout
} from 'src/types/inputs';
import { User } from "./users.entity";

@Resolver()
export class UserResolver {
    constructor(private userService: UsersService) { }

    @Query(() => User)
    async user(@Args('email') email: string): Promise<User> {
        return this.userService.find(email)
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Mutation(() => User)
    async create(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        return await this.userService.create(createUserInput)
    }

    @Mutation(() => Cart)
    async book(@Args('createBooking') createBooking: CreateBooking): Promise<Cart | string | unknown> {
        return await this.userService.book(createBooking)
    }

    @Mutation(() => [CheckoutOrder])
    async checkOut(@Args('checkout') checkout: Checkout): Promise<CheckoutOrder[] | string> {
        return await this.userService.checkout(checkout)
    }
}