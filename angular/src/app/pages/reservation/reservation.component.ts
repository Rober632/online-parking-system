import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { Otp } from 'src/app/interfaces/otp';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Name } from 'src/app/interfaces/name';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  model : Otp = {
    otp : null
  }
  reservation : Name = {
    name : null
  }
  token : any;
  timer = false;
  decodedToken : any;
  user : any;
  response: any;
  error : any;
  responseOtp : any;
  errorOtp : any;
  OtpInput = false;
  storedDate: any;
  timeDiff : any;
  reserve = false ;
  checked = false;
  hasBooked : any
  timerInterval : any
  checkInTime : any
  checkOutTime : any
  elapsedTime: any;
  price = 0.5
  totalPrice : any
  parkings : any
  url = 'http://localhost:3000/'
  convertSecondsToHours(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemainder = seconds % 60;
    return `${hours}h ${minutes}m ${secondsRemainder}s`;
  }
  convertSecondsToMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondsRemainder.toString().padStart(2, '0')}`;
  }
  convertSecondsToMinutesOnly(seconds: number): number {
    const minutes = Math.floor(seconds / 60);
    return minutes;
  }
  convertSecondsToMinutesRoundUp(seconds: number): number {
    const minutes = Math.ceil(seconds / 60);
    return minutes;
  }
  startTimer() {
    this.updateTimer();
    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    const currentDate = moment().toDate(); 
    const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    const dateObject = moment(formattedDate, 'YYYY-MM-DD HH:mm:ss').toDate();
    this.checkInTime = moment(this.storedDate, 'YYYY-MM-DD HH:mm:ss').toDate(); 
    const startTime = moment(this.checkInTime, 'YYYY-MM-DD HH:mm:ss');
    const endTime = moment(this.checkOutTime, 'YYYY-MM-DD HH:mm:ss');
    const elapsedMinutes = endTime.diff(startTime, 'minutes');
    this.elapsedTime = `${elapsedMinutes} minutes`;
    const diff = Math.floor((dateObject.getTime() - this.checkInTime.getTime()) / 1000); 
    this.timeDiff = Number(diff);
    this.totalPrice = this.price * this.convertSecondsToMinutesRoundUp(this.timeDiff)
  }
  stopTimer() {
    clearInterval(this.timerInterval);
    
  }
  getParking(){
    
    this.global.getParking().subscribe( res => {
      this.parkings = res.data
      console.log("parkings ", this.parkings);
      
    },
    error => {
      console.log(error.message);
    })
  }

  constructor(public global : GlobalService , private http : HttpClient ,private authService: AuthService, private router: Router){

    this.token = authService.getToken();
    try {
      this.decodedToken = jwt_decode(this.token);
      this.user = this.decodedToken.user
      console.log(this.user);
   } catch (err) {
     console.error(err);
   }
  }
  
  ngOnInit() {
    this.getParking()
  }

  
  handelReservation(form : NgForm){       
    this.checkOutTime = null
    console.log('form' , form.form.value);
    
    this.global.reservation({user : this.user , parkingName : form.form.value.name}).subscribe(
      response => {
        this.reserve = true
        this.response = response.message
        this.storedDate =  moment(response.data.startDate).format('YYYY-MM-DD HH:mm:ss')
        console.log(response.data.startDate);
      },
      error => {
        this.error = error.error.message
        console.error(error);
      }
    );
}
handelOtp(form : NgForm){
  const otp = form.form.value.otp
  this.global.checkOtp({otp , userInfo : this.user}).subscribe(
    response => {
      this.startTimer()
      this.responseOtp = response.message
      this.timer = true
      this.OtpInput = true
      console.log(response);
    },
    error => {
      this.errorOtp = error.error.message
      console.error(error);
    }
  );
}

handleCheckout(event : Event) {

  this.checkOutTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const checkinTime = moment(this.checkInTime).format('YYYY-MM-DD HH:mm:ss')  
  const checkoutInfo : any  = {price : this.price , totalPrice : this.totalPrice , timeDiff : this.timeDiff , checkInTime : checkinTime , checkOutTime: this.checkOutTime}
  this.responseOtp = null
  this.timer = false
  this.OtpInput = false
  this.response = null
  this.error = null
  this.reserve = false
  this.checked = true
  this.stopTimer()
  const data = { user : this.user , reservationInfo : checkoutInfo}
  this.global.checkOut(data).subscribe()
    localStorage.setItem('checkoutInfo' ,JSON.stringify(checkoutInfo))
    this.router.navigate(['/parking/summary']);
  }

}

