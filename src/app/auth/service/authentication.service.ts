import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }
  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json", "Referer" : "https://staginglogin.pacificabs.com/", "Accept": "application/json, text/plain, */*"})
  };

  login(email: string, password: string) {
    // this._http.post<any>(`${environment.apiUrl}/auth/token`, { Username : email, Password : password }).subscribe((res)=>{
    //   console.log(res)
    // })

    console.log(this.httpOptions);
    return  this._http
      .post<any>(`${environment.apiUrl}/security/token`, { username : email, password : password },this.httpOptions)    
      .pipe(
        map(user => {
          console.log(user.ResponseData.Token)
          // login successful if there's a jwt token in the response
          if (user && user.ResponseData) {          
            console.log(user)  
            user.token = user.ResponseData.Token;
            user.role = 'Admin';   
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Display welcome toast!
            this.currentUserSubject.next(user);                     
            // notify          
          }else { 

          }
          return user;
        })        
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
  
}
