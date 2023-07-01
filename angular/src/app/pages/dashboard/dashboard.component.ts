import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { addParking } from 'src/app/interfaces/add-parking';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  model : addParking = {
    name : "",
    floor : null ,
    slot : null,
    price : null
  }

  parking : any
  constructor(private http: HttpClient ,public global : GlobalService , private location : Location ) { }
 
  ngOnInit(){
    this.getParking()
  }
  reloadPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }
  getParking(){
    
    this.global.getParking().subscribe( res => {
      this.parking = res.data
    },
    error => {
      console.log(error.message);
    })
  }

  addParking(form : NgForm){
    console.log(form);
    const data= form.form.value
    this.global.addParking(data).subscribe( res => {
      console.log(res);
      this.reloadPage()
    },
    error => {
      console.log(error.message);
      })
  }

  removeParking(id: number) {
    this.global.removeParking(id).subscribe( res => this.reloadPage()
  )}
}
