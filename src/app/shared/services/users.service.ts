import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {dbUser} from '../../../environments/interfaces';
import {environment} from '../../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  create(user: dbUser): Observable<dbUser> {
    return this.http.post(`${environment.fbDbUrl}/users.json`, user)
      .pipe(map(response => {
        return {
          ...user
        }
      }))
  }

  getAll(): Observable<dbUser[]> {
    return this.http.get(`${environment.fbDbUrl}/users.json`)
      .pipe(
        map(response => {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key
            }))
        })
      )
  }

  getUser(id: string): Observable<dbUser> {
    return this.http.get<dbUser>(`${environment.fbDbUrl}/users/${id}.json`)
      .pipe(map((user: dbUser) => {
        return {
          ...user, id
        }
      }))
  }

  editUser(id, user: dbUser): Observable<dbUser> {
    return this.http.patch<dbUser>(`${environment.fbDbUrl}/users/${id}.json`, user);
  }

  del(id): Observable<any> {
    return this.http.delete(`${environment.fbDbUrl}/users/${id}.json`)
  }
}
