import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { BookingsService } from './bookings.service';
import { Booking } from './interfaces/booking.interface';


@Controller('bookings')
export class BookingsController {

    constructor(private bookingService: BookingsService) { }

    @Post()
    async create(@Body() bookingDto: BookingDto) {
        return this.bookingService.create(bookingDto);
    }

    @Get()
    async getAll(): Promise<Booking[]> {
        return this.bookingService.getAll();
    }

    @Get(':date')
    async getSchedule(@Param() params) {
        return this.bookingService.getSchedule(params.date);
    }

    @Get('/user/:username')
    async getUser(@Param() params) {
        return this.bookingService.getforUser(params.username);
    }
}
