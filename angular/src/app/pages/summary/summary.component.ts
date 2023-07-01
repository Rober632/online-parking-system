import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  checkoutInfo : any
  checkinTime : any
  checkoutTime : any
  elapsedTime : any
  price : any
  totalPrice : any
  ngOnInit() {
    let info = localStorage.getItem('checkoutInfo');
    if (typeof info === 'string') {
      this.checkoutInfo = JSON.parse(info);
      console.log(this.checkoutInfo);
    } else {
      console.log('Value is null or not a string');
    }
    console.log(this.checkoutInfo);
    this.checkinTime = this.checkoutInfo.checkInTime
    this.checkoutTime = this.checkoutInfo.checkOutTime
    this.elapsedTime = this.checkoutInfo.timeDiff
    this.price = this.checkoutInfo.price
    // this.totalPrice = this.price * this.convertSecondsToMinutesOnly(this.elapsedTime)
    this.totalPrice = this.checkoutInfo.totalPrice
  }
  convertSecondsToHours(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemainder = seconds % 60;
    if(hours === 0 ){
      return `${minutes}m ${secondsRemainder}s`;
    }
    else if(minutes===0){
      return `${secondsRemainder}s`;
    }
    else{
      return `${hours}h ${minutes}m ${secondsRemainder}s`;
    }
  }
  convertSecondsToMinutesOnly(seconds: number): number {
    const minutes = Math.ceil(seconds / 60);
    return minutes;
  }


}
