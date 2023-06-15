import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { User } from './models/user';
import { Service } from './models/service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  reloadPage() {
    window.location.reload();
  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]);
    })
  }

  getData() {
    return this.http.get('/api/getData')
  }

  getUserList() {
    return this.http.get<User[]>('/api/getUserList')
  }

  getUser(user: User) {
    return this.http.put<User>('/api/getUser', user)
  }

  getServiceList() {
    return this.http.get<Service[]>('/backend/api/services')
  }

  registerProduct(product: Product) {
    return this.http.post<Product>('/api/product', product)
  }

  registerUser(user: User) {
    return this.http.put<User>('/api/registerUser', user)
  }

  registerService(service: Service) {
    return this.http.post<Service>('/backend/api/services', service)
  }

  deleteService(service: Service) {
    return this.http.put<Service>('/api/deleteService', service)
  }

  deleteUser(user: User) {
    return this.http.post<User>("/api/deleteUser", user);
  }

  updateUser(user: User) {
    return this.http.put<User>('/api/user', user)
  }

  updateService(service: Service) {
    return this.http.put<Service>('/api/service', service)
  }
}
