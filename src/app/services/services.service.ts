import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuModel } from '../interface/menu-model';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
private controllerName = 'api/Angular/'
 private url='http://localhost:5165/'
  constructor(private http: HttpClient) { }
  onlogin(obj: any):Observable<any>{
    return this.http.post('http://localhost:5108/api/Auth/login',obj)
  }

  getMenuModels(): Observable<MenuModel[]>{
    return this.http.get<MenuModel[]>(this.url+this.controllerName+'MenuModels');
  }
}
