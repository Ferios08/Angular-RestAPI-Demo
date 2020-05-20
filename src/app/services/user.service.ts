import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as process from 'process'
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API= 'http://40.115.42.230';
const PORT=3000;

const apiUrl = `${API}:${PORT}/` ||'http://localhost:3000/';

console.log(apiUrl);
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  addUser(user): Observable<any> {
    const url = `${apiUrl}user`;
    this.httpclient.post(url, user, httpOptions).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      });
    return null;
  }
  getUser(username): Observable<any> {
    const url = `${apiUrl}user/`;
    return this.httpclient.get(url + username, httpOptions).pipe(map(this.extractData));
  }

  getAllUsers(): Observable<any> {
    const url = `${apiUrl}users/`;
    return this.httpclient.get(url, httpOptions).pipe(map(this.extractData));
  }

  deleteUser(username) {
    const url = `${apiUrl}user/`;
    return this.httpclient.delete(url + username, httpOptions).pipe(map(this.extractData));
  }
}
