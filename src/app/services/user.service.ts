import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../models/user-info';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseUrl: string ='YOUR_API_URL' +'/User';
  
  constructor(private http: HttpClient) { }

  login(login: Login): Observable<Login> {
    return this.http.post<Login>(this.apiBaseUrl + '/Login', login);
  }

  register(user:UserInfo):Observable<any>{
    return this.http.post<any>(this.apiBaseUrl + '/Register', user);
  }
}
