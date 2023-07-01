
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  token: any;
  decodedToken: any;
  user : any;

  constructor(private authService: AuthService) {
    this.token = authService.getToken();
    try {
       this.decodedToken = jwt_decode(this.token);
       this.user = this.decodedToken.user
      console.log(this.user);
    } catch (err) {
      console.error(err);
    }
    
  }    
}