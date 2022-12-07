import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { User } from './models/user';
import { Service } from './models/service';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http : HttpClient) { }

  getData(){
    return this.http.get('/api/getData')
  }

  getUserList(){
    return this.http.get<User[]>('/api/getCustomer')
  }

  getServiceList() {
    return this.http.get<Service[]>('/api/getService')
  }

  registerProduct(product : Product){
    return this.http.post<Product>('/api/product',product)
  }

  registerUser(user : User){
    return this.http.put<User>('/api/registerCustomer',user)
  }

  registerService(service: Service) {
    return this.http.put<Service>('/api/registerService', service)
  }

  updateUser(user : User){
    return this.http.put<User>('/api/customer',user)
  }

  updateService(service : Service) {
    return this.http.put<Service>('/api/service', service)
  }
}
