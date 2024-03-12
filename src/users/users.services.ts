import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import {
  CheckoutOrder,
  Cart,
  CreateUserInput,
  CreateBooking,
  Checkout,
} from './users.entity';
import { users } from 'src/lib/travels';
import DbService from 'src/lib/db';
import {
  ordersModel,
  cartModel,
} from 'src/lib/models/cartsOrders';
import travelsModel from 'src/lib/models/travels';
import {
  usersModel,
} from 'src/lib/models/users';

@Injectable()
export class UsersService {
  users: User[];
  userExceptionMessage: string;

  constructor(private db: DbService) {
    this.users = users;
    this.userExceptionMessage = 'Unknown user detected';
  }

  async find(email: string): Promise<User> {
    try {
      const user = (await usersModel.findOne({ email })) as User;
      if (!user) {
        console.log(this.userExceptionMessage);
        return Promise.reject(this.userExceptionMessage);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await usersModel.find();
    } catch (error) {
      console.log(error);
    }
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user: User = {
      ...createUserInput,
      id: `${Math.random()}`,
    };
    try {
      const newUser = await usersModel.create(user);
      await newUser.save();

      return Promise.resolve(user);
    } catch (error) {
      console.log(error);
    }
  }

  async book(
    createBooking: CreateBooking,
  ): Promise<Cart | string | unknown | object> {
    const { email, travelId, numOfSeats } = createBooking;

    try {
      let cart = await cartModel.findOne({ email });
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 15);
      const order = { id: travelId, numOfSeats };
      const cartItem: Cart = {
        email,
        orders: [order],
        expireAt: new Date(expirationDate),
      };

      if (!cart) {
        cart = await new cartModel(cartItem).save();
        return Promise.resolve(cart);
      }

      const { orders } = cart;
      orders.push(order);
      cart.save();
      return Promise.resolve(cart);
    } catch (error) {
      console.log(error);
    }
  }

  async checkout(checkout: Checkout): Promise<CheckoutOrder[] | string> {
    const { email, orders, amount } = checkout;

    try {
      const travels = await travelsModel.find({
        id: { $in: [...orders.map((o) => o.id)] },
      });
      const travelPrices = travels.reduce((acc, nex) => (acc += nex.price), 0);
      const balance = amount - travelPrices;

      if (balance >= 0) {
        await new ordersModel({
          orders,
          email,
          amount,
        }).save();

        return await ordersModel.find({ email });
      }
      return Promise.reject('Insufficient Balance');
    } catch (error) {
      console.log(error);
    }
  }
}
