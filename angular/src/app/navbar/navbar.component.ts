import { Component , Input} from '@angular/core';
import { GlobalService } from '../services/global.service';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() user: any;
  token: any;
  decodedToken: any;
  constructor(public global : GlobalService  , private authService: AuthService){
  this.token = authService.getToken();
  try {
    this.decodedToken = jwt_decode(this.token);
    this.user = this.decodedToken.user
   console.log(this.user);
 } catch (err) {
   console.error(err);
 }
  }
  handleLogout(){
    localStorage.removeItem('token')
    this.global.isLogin = false
    location.reload();
  }
}

