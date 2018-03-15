import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient){
      // this.createNinja("Happy Ninja");
      // this.farm("5aaad34d68baff207095d4f2");
      // this.cave("5aaad34d68baff207095d4f2");
      // this.house("5aaad34d68baff207095d4f2");
      this.casino("5aaad34d68baff207095d4f2");
  }

  createNinja(name){
    let ninja = this._http.post('/ninja', {name: name});
    ninja.subscribe(data => console.log("Successfully created a ninja!", data));
  }
  farm(id){
    let total = this._http.get('/farm/' + id);
    total.subscribe(data => console.log("FARM SUCCESS", data));
  }
  cave(id){
    let total = this._http.get('/cave/' + id);
    total.subscribe(data => console.log("CAVE SUCCESS", data));
  }
  house(id){
    let total = this._http.get('/house/' + id);
    total.subscribe(data => console.log("HOUSE SUCCESS", data));
  }
  casino(id){
    let total = this._http.get('/casino/' + id);
    total.subscribe(data => console.log("CASINO SUCCESS", data));
  }
}
