import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsController } from './bookings/bookings.controller';

@Module({
  imports: [],
  controllers: [AppController, BookingsController],
  providers: [AppService],
})
export class AppModule {}
