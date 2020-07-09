import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { BookingsService } from './bookings.service';
import { Booking } from './interfaces/booking.interface';


@Controller('bookings')
export class BookingsController {

    constructor(private bookingService:BookingsService){}

    @Post()
    async create(@Body() bookingDto: BookingDto) {
        return this.bookingService.create(bookingDto);
    }
    @Get()
    async findAll(): Promise<Booking[]> {
        return this.bookingService.findAll();
      }
}
