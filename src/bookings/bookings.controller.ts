import { Controller, Get, Post } from '@nestjs/common';

@Controller('bookings')
export class BookingsController {

    @Post()
    create(): string {
        return 'This action adds a new cat';
    }
    @Get()
    async findAll(): Promise<any[]> {
        return ['This action returns a list'];
      }
}
