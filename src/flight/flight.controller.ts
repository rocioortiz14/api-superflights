/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, Delete, Param, HttpStatus, HttpException, UseGuards} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { PassengerService } from 'src/passenger/passenger.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {
    constructor(private readonly flightService: FlightService
      ,private readonly passengerService: PassengerService) {}

    @Post()
    @ApiOperation({summary: 'Create Flight'})
    create(@Body() flightDTO: FlightDTO) {
      return this.flightService.create(flightDTO);
    }
  
    @Get()
    @ApiOperation({summary: 'Get All Flights'})
    findAll() {
      return this.flightService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({summary: 'Get  Flight by Id'})
    findOne(@Param('id') id:string){
      return this.flightService.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({summary: 'Update Flight'})
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO
    ) {
      return this.flightService.update(id, flightDTO);
    }
  
    @Delete(':id')
    @ApiOperation({summary: 'Delete Flight'})
    delete(@Param('id') id: string) {
      return this.flightService.delete(id);
    }

    @Post(':flightId/passenger/:passengerId')
    @ApiOperation({summary: 'Add Passenger to Flight'})
    async addPassenger(
      @Param('flightId') flightId: string,
      @Param('passengerId') passengerId: string,
    ) {
      const passenger = await this.passengerService.findOne(passengerId);
      if (!passenger) {
        throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
      }
      
      return this.flightService.addPassenger(flightId, passengerId);
    }
    

}
