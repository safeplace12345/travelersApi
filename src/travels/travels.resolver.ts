import { TravelsService } from "./travels.services";
import {Resolver, Query, Args} from "@nestjs/graphql"
import { Travel } from "./travels.entity";

@Resolver()
export class TravelResolver {
    constructor(private travelService: TravelsService) {}

    @Query(() => [Travel])
    async travels ():Promise<Travel[]> {
        return this.travelService.findAll()
    }
    
    @Query(() => Travel)
    async travel (@Args('travelId') travelId: string):Promise<Travel> {
        return this.travelService.find(travelId)
    }
}