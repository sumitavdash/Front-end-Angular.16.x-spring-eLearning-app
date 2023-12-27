import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

interface User {
  username: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn= false;
   //user= null;
  user:User | null = null;
  constructor(public login:LoginService){

  }
  ngOnInit(): void {

    this.isLoggedIn= this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(_data=>{
      this.isLoggedIn= this.login.isLoggedIn();
    this.user=this.login.getUser();
    });
     
  }
  logout() {
    this.login.logOut();  
    window.location.reload();

  }

}
