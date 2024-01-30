import { Injectable } from '@angular/core';
import { Category } from '../../app/types/Category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  cateUrl = 'https://dbasm.onrender.com/Categories'; // khai bao apiUrl

  constructor(private http: HttpClient) { }
  getAllCate():Observable<Category[]>{
    return this.http.get<Category[]>(this.cateUrl);
  }
  getCateById(id:string):Observable<Category>{
    return this.http.get<Category>(`${this.cateUrl}/${id}`)
  }
  deleteCate(id:string):Observable<Category>{
    return this.http.delete<Category>(`${this.cateUrl}/${id}`);
  }
  createCate(category:Category):Observable<Category>{
    return this.http.post<Category>(this.cateUrl, category);
  }
  updateCate(id:string, category:Category):Observable<Category>{
    return this.http.put<Category>(`${this.cateUrl}/${id}`, category);
  }
}