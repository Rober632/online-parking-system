import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/interfaces/register';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model : Register = {
    name : "",
    email : "",
    password : ""
  }
  msgError = null
  constructor(private global : GlobalService , private router : Router){}
    handelSumbit(form : NgForm){
      if(form.valid){
        this.global.register(this.model).subscribe(res => {console.log(res)
        if(res.ApiStatus) this.router.navigateByUrl('login')
      },(e : any) => {
          this.msgError = e.error.message
          console.log(e.error.message)})
  }
    
  }
}
