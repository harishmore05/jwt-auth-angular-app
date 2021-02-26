import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions:any;
  constructor(
    private http: HttpClient,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  register(data: any) {
    return this.http.post('http://localhost:3000/register', data, this.httpOptions)
  }

  signin(data: any) {
    return this.http.post('http://localhost:3000/login', data, this.httpOptions)
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
