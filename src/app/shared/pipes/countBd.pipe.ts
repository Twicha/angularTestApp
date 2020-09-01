import {Pipe, PipeTransform} from '@angular/core';
import {dbUser} from '../../../environments/interfaces';

@Pipe({
  name: 'coundBd'
})
export class CountBdPipe implements PipeTransform{
  transform(date: number): number | string {

    const dateFunc = (key, value = Date.now()) => {
      return +(new Date(value)).toLocaleString("ru", {[key]: 'numeric'})
    };

    const dateNow:{[key: string]: number} = {
      day: dateFunc('day'),
      month: dateFunc('month'),
      year: dateFunc('year'),
    };

    const birthDay:{[key: string]: number} = {
      day: dateFunc('day', date),
      month: dateFunc('month', date),
      year: dateFunc('year', date),
    };

    if (dateNow.year - birthDay.year <= 0) {
      if (dateNow.year - birthDay.year == 0) {
        return ' пользователь слишком мал';
      }

      if (dateNow.month - birthDay.month <= 0) {
        if (dateNow.day - birthDay.day <= 0) {
          return (dateNow.year - birthDay.year) - 1;
        }

        return (dateNow.year - birthDay.year) - 1;
      }
    }

    return dateNow.year - birthDay.year;
  }

}
