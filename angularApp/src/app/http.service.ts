import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient){ }

  createNinja(name){
    return this._http.post('/ninja', {name: name});
  }
  farm(id){
    return this._http.get('/farm/' + id);
  }
  cave(id){
    return this._http.get('/cave/' + id);
  }
  house(id){
    return this._http.get('/house/' + id);
  }
  casino(id){
    return this._http.get('/casino/' + id);
  }
}