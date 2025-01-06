import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  // Initiate password reset
  public initiatePasswordReset(email: string): Observable<any> {
    const request = { email: email };
    return this.http.post(`${baseUrl}/user/initiate-password-reset`, request);
  }
   

completePasswordReset(data: { token: string, newPassword: string }): Observable<any> {
   
  return this.http.post(`${baseUrl}/user/complete-password-reset`,  data);
}
}