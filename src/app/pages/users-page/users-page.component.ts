import {Component, OnDestroy, OnInit} from '@angular/core';
import {dbUser} from '../../../environments/interfaces';
import {Subscription} from 'rxjs';
import {UsersService} from '../../shared/services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  users: dbUser[] = [];
  uSub: Subscription;
  searchValue: string = '';
  searchUsers: dbUser[] = null;
  notFound: boolean = false;
  sorted: boolean = false;

  search: Function;
  clear: Function;
  discharge: Function;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loading = true;

    this.uSub = this.usersService.getAll().subscribe(users => {
      this.users = users;

      this.loading = false;
    }, error => {
      this.loading = false;
    });

    this.search = () => {
      console.log('searchvalue', this.searchValue);
      console.log(this.users);

      if (!this.searchValue.trim()) {
        this.searchUsers = null;
        console.log(22);
      }

      this.searchUsers = this.users.filter(user => {
        console.log('sdfdsf' , user.fio.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()));
        return user.fio.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase());
      });

      if (!this.searchUsers.length) {
        this.notFound = true;
      }
    };

    this.clear = () => {
      if (!this.searchValue.trim()) {
        this.discharge();
      }
    };

    this.discharge = () => {
      this.searchValue = '';
      this.searchUsers = null;
      this.notFound = false;
    }
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }


  remove(id: any) {
    if (confirm('Вы точно хотите удалить данного пользователя?')) {
      this.usersService.del(id)
        .subscribe(() => {
          this.users = this.users.filter(u => u.id !== id);
        });
    }
  }

  sort(param) {
    if (this.sorted) {
      this.users = this.users.sort(((a, b) => a[param] > b[param] ? 1: -1));
      this.sorted = !this.sorted;
    } else {
      this.users = this.users.sort(((a, b) => a[param] > b[param] ? -1: 1));
      this.sorted = !this.sorted;
    }
  }

  searchChange(value: string) {
    this.searchValue = value;
  }
}
