import { Component } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gold = 100;
  messages = [];

  constructor(private _httpService: HttpService){

  }
  
  farm(){
    // console.log('Start Farming!')
    // let wages = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    // this.messages.push(`You earned ${wages} while working on the Farm.`);
    // this.gold += wages;
  }
  house(){
    // console.log('Start Crafting!')
    // let wages = Math.floor(Math.random() * (10 - 5 + 1) + 5);
    // this.messages.push(`You earned ${wages} while crafting at your House.`);
    // this.gold += wages;
  }
  cave(){
    // console.log('Start exploring!')
    // let treasures = Math.floor(Math.random() * (15 - 7 + 1) + 7);
    // this.messages.push(`You earned ${treasures} while exploring the Cave.`);
    // this.gold += treasures;
  }
  casino(){
    // console.log('Start gambling!')
    // let winnings = Math.floor(Math.random() * (100 - 0 + 1) + 0);
    // let coinFlip = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    // if(coinFlip) winnings *= -1;
    // console.log(coinFlip)
    // this.messages.push(`You earned ${winnings} while gambling at the Casino!`);
    // this.gold += winnings;
  } 
}
