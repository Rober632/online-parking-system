import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = 'token';

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }
}