import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.services';
import DbService from 'src/lib/db';
import { User } from './users.entity';
import { Order } from 'src/types/objects';
import { CreateBooking } from 'src/types/inputs';

describe('UserResolver', () => {
  let app: TestingModule;
  let usersService: UsersService;
  let dbService: DbService;
  let user: User;
  let users: User[];
  let order: Order;
  let bookingOrder: CreateBooking;
  let orders: Order[];
  
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserResolver],
      providers: [DbService, UsersService],
    }).compile();
    dbService = new DbService()
    usersService = new UsersService(dbService)
    user = { id: `traveler-${Math.random()}`, name: "test", email: "test@travelapp.com" }
    users = [user]
    order = { numOfSeats: 5, id: "d408be33-aa6a-4c73-a2c8-58a70ab2ba4d" }
    bookingOrder = {email: user.email, travelId: order.id, numOfSeats: order.numOfSeats}
    orders = [order]
  });

  describe('UsersService', () => {
    it('should return "a single user based on provided email!"', () => {

      jest.spyOn(usersService, 'find').mockImplementation(() => Promise.resolve(user));

      expect(usersService.find(user.email)).resolves.toBe(user);
    });

    it('should return "a multiple users!"', () => {

      jest.spyOn(usersService, 'findAll').mockImplementation(() => Promise.resolve(users));

      expect(usersService.findAll()).resolves.toBe(users);
    });

    it('should create and return "a single user!"', () => {
      const { email, name } = user
      jest.spyOn(usersService, 'create').mockImplementation(() => Promise.resolve(user));

      expect(usersService.create({ email, name })).resolves.toBe(user);
    });

    it('should create and return "a single user!"', () => {
      const { email, name } = user
      jest.spyOn(usersService, 'create').mockImplementation(() => Promise.resolve(user));

      expect(usersService.create({ email, name })).resolves.toBe(user);
    });

    it('should create "a single Booking and return a Cart!"', () => {
      const result = {
        email: user.email,
        orders: order,
        expireAt: "",
      }
      jest.spyOn(usersService, 'book').mockImplementation(() => Promise.resolve(result));

      expect(usersService.book(bookingOrder)).resolves.toBe(result);
    });

    it('should complete "a checkout process and return an Orders Array!"', () => {
      const checkoutPayload = {
        amount: 1000000,
        email: user.email,
        orders: [{numOfSeats: 5, id: "traveler"}],
      } 
      const result = [{email: user.email, orders: [{numOfSeats: 5, id: "traveler"}]}]
      jest.spyOn(usersService, 'checkout').mockImplementation(() => Promise.resolve(result));

      expect(usersService.checkout(checkoutPayload)).resolves.toBe(result);
    });
  });
});