/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, Get, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDTO } from './dto/passenger.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  @ApiOperation({summary: 'Create Passenger'})
  create(@Body() passengerDTO: PassengerDTO) {
    return this.passengerService.create(passengerDTO);
  }

  @Get()
  @ApiOperation({summary: 'Get All Passengers'})
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get Passenger by Id'})
  findOne(@Param('id') id:string){
    return this.passengerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update Passenger'})
  update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
    return this.passengerService.update(id, passengerDTO);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete Passenger'})
  delete(@Param('id') id: string) {
    return this.passengerService.delete(id);
  }
}
