import { Injectable, BadRequestException } from '@nestjs/common';
import { Booking } from './interfaces/booking.interface'


@Injectable()
export class BookingsService {
    //This will be our temp data source
    private readonly bookings: Booking[] = [];

    create(booking: Booking) {
        try {
            if (booking.date && booking.username) {
                booking.date = new Date(booking.date);
                //A booking date should be between 9Am to 6PM excluding Sundays(0)
                if (booking.date.getHours() >= 9 && booking.date.getHours() < 18 && booking.date.getDay()) {
                    //find the ones with same booking
                    let result = this.bookings.filter(bk => bk.date.getTime() === booking.date.getTime());
                    //2 inspections on weekdays                 
                    if (result.length < 2 && booking.date.getDay() != 6) {
                        this.bookings.push(booking);
                        return booking;
                    } //4 inspections on Saturdays 
                    else if (result.length < 4 && booking.date.getDay() == 6) {
                        this.bookings.push(booking);
                        return booking;
                    } else {
                        throw new BadRequestException('Sorry, This time-slot is already occupied');
                    }

                } else {
                    throw new BadRequestException('You can only book between 9AM to 6PM from Monday to Saturday');
                    // return {"error": "You can only book between 9AM to 6PM"}
                }

            } else {
                throw new BadRequestException('input incomplete');
            }

        } catch (err) {
            return err;
        }
    }

    getAll(): Booking[] {
        return this.bookings;
    }

    getforUser(username: string): Booking[] {
        let result = this.bookings.filter(bk => bk.username === username);
        return result;
    }

    getSchedule(dateStr: string): any[] {

        if (dateStr) {
            let result: any[] = [];
            let date = new Date(dateStr);
            let res = this.bookings.filter(bk => bk.date.toDateString() === date.toDateString());
            
            let start = new Date(date);
            start.setHours(9, 0, 0);
            // console.log(start);
            let end = new Date(date);
            end.setHours(18, 0, 0);
            // console.log(end);
            var d1 = new Date();
            var d2 = new Date(d1);
            d2.setMinutes(d1.getMinutes() + 30);
            let maxcount = 2;
                if(date.getDay() == 6)
                {
                    maxcount = 4;
                }
            
            for (var dates: Booking[] = [], dt = start; dt < end; dt.setMinutes(dt.getMinutes() + 30)) {
                let pp = res.filter(bk => bk.date.getTime() === dt.getTime())
                
                result.push({count: maxcount - pp.length, date:new Date(dt)});
            }
            return result;
        }
        else {
            throw new BadRequestException('input incomplete');
        }

    }
}
