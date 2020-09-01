import {Pipe, PipeTransform} from '@angular/core';
import {dbUser} from '../../../environments/interfaces';

@Pipe({
  name: 'searchUsers'
})
export class SearchPipe implements PipeTransform{
  transform(users: dbUser[], searchValue: string = ''): dbUser[] {
    if (!searchValue.trim()) {
      return users;
    }

    return users.filter(user => {
      return user.fio.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
    })
  }

}
