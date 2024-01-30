import { Injectable, inject } from '@angular/core'; // inject
import { HttpClient } from '@angular/common/http'; // HttpClient
import { Product, ProductAdmin } from '../types/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // call api
  apiAdminUrl = 'https://dbasm.onrender.com/Products'; // khai bao apiUrl

  http = inject(HttpClient); // inject bien http
  constructor() {}

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiAdminUrl); //axios.get(apiUrl)
  }

  getProductListAdmin(): Observable<ProductAdmin[]> {
    return this.http.get<ProductAdmin[]>(this.apiAdminUrl); //axios.get(apiUrl)
  }
  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(`${this.apiAdminUrl}/${id}`)
  }
  deleteProductAdmin(id:string):Observable<Product>{
    return this.http.delete<Product>(`${this.apiAdminUrl}/${id}`);
  }
  createProductAdmin(data:Product):Observable<Product>{
    return this.http.post<Product>(this.apiAdminUrl, data)
  }
  updateProductAdmin(id:string, product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiAdminUrl}/${id}`, product);
  }
}
