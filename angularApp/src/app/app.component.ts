import { Component, Injectable, OnInit } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gold = 0;
  messages = [];
  ninja: any; //name = '';
  id = '';

  constructor(private _httpService: HttpService){
    
  }

  ngOnInit() {
    this.ninja = { name: "" }
  }

  login(){
    let ninja = this._httpService.createNinja(this.ninja.name);

    ninja.subscribe(data => {
      this.gold = data.ninja.total;
      this.id = data.ninja._id;
    });
  }
  
  farm(){
    let total = this._httpService.farm(this.id);

    total.subscribe(data => {
      this.gold = data.ninja.total;
      this.messages.push(data.message);
      console.log("FARM SUCCESS", data)
    });
  }

  cave(){
    let total = this._httpService.cave(this.id);

    total.subscribe(data => {
      this.gold = data.ninja.total;
      this.messages.push(data.message);
      console.log("CAVE SUCCESS", data)
    });
  }
  
  house(){
    let total = this._httpService.house(this.id);

    total.subscribe(data => {
      this.gold = data.ninja.total;
      this.messages.push(data.message);
      console.log("HOUSE SUCCESS", data)
    });
  }

  casino(){
    let total = this._httpService.casino(this.id);

    total.subscribe(data => {
      this.gold = data.ninja.total;
      this.messages.push(data.message);
      console.log("CASINO SUCCESS", data)
    });
  } 
}