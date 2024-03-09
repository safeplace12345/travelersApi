import { Injectable } from '@nestjs/common';
import { Travel } from './travels.entity';
import DbService from '../lib/db';
import travelsModel from 'src/lib/models/travels';
import { travels } from 'src/lib/travels';

@Injectable()
export class TravelsService {
  constructor(private db: DbService) {
  }

  async findAll(): Promise<Travel[]> {   
    return await travelsModel.find()
  }

  async find(travelId: string): Promise<Travel> {
    return await travelsModel.findOne({id: travelId})
  }

  async seedDb(): Promise<void> {
    for (const travel of travels) {
      const newTravel = new travelsModel(travel);
      await newTravel.save();
    }
  }
}
