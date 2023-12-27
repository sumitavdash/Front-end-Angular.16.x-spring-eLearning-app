import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  //adding user
  public addUser(user: any){
    return this.http.post(`${baseUrl}/user/`,user);

  }
  //updating user
  public  saveUser(userId:any,user:any){
    return this.http.put(`${baseUrl}/user/${userId}`,user);
  }

  public getUserById(user:any){
    return this.http.get(`${baseUrl}/user/`,user);
  }

  //correct form
  getuserbyId(userId: number): Observable<any> {
    return this.http.get(`${baseUrl}/user/${userId}`);
  }

  public getAllUsers(): Observable<any> {
    return this.http.get(`${baseUrl}/user/all`);
  }

 public deleteUser(userId: number)   {
  return this.http.delete(`${baseUrl}/user/${userId}`);
 }

 


}
