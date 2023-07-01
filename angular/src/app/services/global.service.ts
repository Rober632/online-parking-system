import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor( private http : HttpClient) { }
  url = 'http://localhost:3000/'
  isLogin = false

  login(data : any):Observable<any>{
    this.isLogin = true
    return this.http.post(`${this.url}login` , data)
  }
  register(data : any):Observable<any>{
    return this.http.post(`${this.url}register` , data)
  }
  reservation(data : any):Observable<any>{
    return this.http.post(`${this.url}parking/reservation` , data)
  }
  checkOtp(data : any):Observable<any>{
    return this.http.post(`${this.url}parking/checkOtp` , data)
  }
  hasBooked(data : any):Observable<any>{
    return this.http.post(`${this.url}parking/hasBooked` , data)
  }
  checkOut(data : any):Observable<any>{
    return this.http.post(`${this.url}parking/checkOut` , data)
  }
  addParking(data : any):Observable<any>{
    return this.http.post(`${this.url}parking/add` , data)
  }
  getParking():Observable<any>{
    return this.http.get(`${this.url}parking/getParking`)
  }

  removeParking(data : any):Observable<any>{
    return this.http.post(`${this.url}parking/removeParking` , {id : data } )
  }

}