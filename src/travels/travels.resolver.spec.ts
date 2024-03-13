import { TravelsService } from './travels.services';
import DbService from 'src/lib/db';
import { Travel } from './travels.entity';

describe('UserResolver', () => {
    let travelsService: TravelsService;
    let dbService: DbService;
    let travel: Travel

    beforeAll(async () => {
        travelsService = new TravelsService(dbService)
        travel = {
            id: "d408be33-aa6a-4c73-a2c8-58a70ab2ba4d",
            slug: "jordan-360",
            name: "Jordan 360°",
            description: "Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert, the ancient beauty of Petra, and much more.\n\nVisiting Jordan is one of the most fascinating things that everyone has to do once in their life.You are probably wondering \"Why?\". Well, that's easy: because this country keeps several passions! During our tour in Jordan, you can range from well-preserved archaeological masterpieces to trekkings, from natural wonders excursions to ancient historical sites, from camels trek in the desert to some time to relax.\nDo not forget to float in the Dead Sea and enjoy mineral-rich mud baths, it's one of the most peculiar attractions. It will be a tour like no other: this beautiful country leaves a memorable impression on everyone.",
            startingDate: "2021-11-01",
            endingDate: "2021-11-09",
            price: 199900,
            moods: {
              nature: 80,
              relax: 20,
              history: 90,
              culture: 30,
              party: 10
            }
          }
    });

    describe('TravelsService', () => {
        it('should return "a single travel!"', () => {
            jest.spyOn(travelsService, 'find').mockImplementation(() => Promise.resolve(travel));

            expect(travelsService.find("d408be33-aa6a-4c73-a2c8-58a70ab2ba4d")).resolves.toBe(travel);
        });

        it('should return "all travels as an array!"', () => {
            jest.spyOn(travelsService, 'findAll').mockImplementation(() => Promise.resolve([travel]));

            expect(travelsService.findAll()).resolves.toStrictEqual([travel]);
        });
    })
});