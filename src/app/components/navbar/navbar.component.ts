import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

interface User {
  username: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  //user= null;
  user: User | null = null;
  constructor(public login: LoginService) {}
  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((_data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }
  logout() {
    this.login.logOut();
    window.location.reload();
  }
}
// import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/services/login.service';
// import { CategoryService } from 'src/app/services/category.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// interface User {
//   username: string;
// }

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css'],
// })
// export class NavbarComponent implements OnInit {
//   isLoggedIn = false;
//   user: User | null = null;
//   userRole: string | null = null;
//   categories: any[] = []; // Array to hold category data

//   constructor(
//     public login: LoginService,
//     private _cat: CategoryService,
//     private _snack: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.isLoggedIn = this.login.isLoggedIn();
//     this.user = this.login.getUser();
//     this.userRole = this.login.getUserRole(); // Fetch user role
//     this._cat.Categories().subscribe(
//       (data: any) => {
//         this.categories = data; // Fetch categories from the server
//       },
//       (error) => {
//         this._snack.open('Error in loading categories from server', '', {
//           duration: 3000,
//         });
//       }
//     );

//     // Listen for login status changes and update accordingly
//     this.login.loginStatusSubject.asObservable().subscribe(() => {
//       this.isLoggedIn = this.login.isLoggedIn();
//       this.user = this.login.getUser();
//       this.userRole = this.login.getUserRole();
//     });
//   }

//   logout() {
//     this.login.logOut();
//     window.location.reload();
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/services/login.service';
// import { CategoryService } from 'src/app/services/category.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';

// interface User {
//   username: string;
// }

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css'],
// })
// export class NavbarComponent implements OnInit {
//   isLoggedIn = false;
//   user: User | null = null;
//   userRole: string | null = null;
//   categories: any[] = []; // Array to hold category data

//   constructor(
//     public login: LoginService,
//     private _cat: CategoryService,
//     private _snack: MatSnackBar,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Check login status
//     this.isLoggedIn = this.login.isLoggedIn();
//     this.user = this.login.getUser();
//     this.userRole = this.login.getUserRole(); // Fetch user role

//     // Handle case where user or role is missing
//     if (!this.user || !this.userRole) {
//       console.error('User or user role is missing');
//       this.userRole = 'GUEST'; // Default role if missing
//     }

//     // Fetch categories from the server
//     this._cat.Categories().subscribe(
//       (data: any) => {
//         this.categories = data; // Fetch categories from the server
//       },
//       (error) => {
//         this._snack.open('Error in loading categories from server', '', {
//           duration: 3000,
//         });
//       }
//     );

//     // Listen for login status changes and update accordingly
//     this.login.loginStatusSubject.asObservable().subscribe(() => {
//       this.isLoggedIn = this.login.isLoggedIn();
//       this.user = this.login.getUser();
//       this.userRole = this.login.getUserRole();
//     });
//   }

//   logout() {
//     this.login.logOut();
//     // window.location.reload();
//     this.router.navigate(['/']);
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/services/login.service';
// import { CategoryService } from 'src/app/services/category.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';

// interface User {
//   username: string;
// }

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css'],
// })
// export class NavbarComponent implements OnInit {
//   isLoggedIn = false;
//   user: User | null = null;
//   userRole: string | null = null;
//   categories: any[] = [];

//   constructor(
//     public login: LoginService,
//     private _cat: CategoryService,
//     private _snack: MatSnackBar,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Initial check for login status
//     this.checkLoginStatus();

//     // Subscribe to login status changes for immediate updates
//     this.login.loginStatusSubject.asObservable().subscribe((isLoggedIn) => {
//       this.isLoggedIn = isLoggedIn;
//       this.user = this.login.getUser();
//       this.userRole = this.login.getUserRole();
//     });

//     // Load categories
//     this.loadCategories();
//   }

//   checkLoginStatus() {
//     this.isLoggedIn = this.login.isLoggedIn();
//     this.user = this.login.getUser();
//     this.userRole = this.login.getUserRole();
//   }

//   loadCategories(): void {
//     if (this.categories.length === 0) {
//       this._cat.Categories().subscribe(
//         (data: any) => {
//           this.categories = data;
//         },
//         (error) => {
//           this._snack.open('Error in loading categories from server', '', {
//             duration: 3000,
//           });
//         }
//       );
//     }
//   }

//   logout() {
//     // Perform logout, update state, and navigate
//     this.login.logOut();
//     this.router.navigate(['/']); // Navigate to the root page or login page
//   }
// }
