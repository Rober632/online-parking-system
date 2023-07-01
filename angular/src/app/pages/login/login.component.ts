import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Login } from 'src/app/interfaces/login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model : Login = {
    email : "",
    password : ""
  }
  msgError = null
  constructor(public global : GlobalService , private router : Router){}
  handleSubmit(form : NgForm){
      console.log(form);
      if(form.valid){
        this.global.login(this.model).subscribe(res => {
        localStorage.setItem('token' ,res.data.token )
        this.global.isLogin = true
        if(res.ApiStatus) this.router.navigateByUrl('')
      },(e : any) => {
          this.msgError = e.error.message
          console.log(e.error.message)})
  }
  }
}
