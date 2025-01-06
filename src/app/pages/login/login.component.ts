// import { Component } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { LoginService } from 'src/app/services/login.service';
// import { UserService } from 'src/app/services/user.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

//   loginData: any ={

//     username:'',
//     password:'',
//     email:'',

//   };

//   constructor(private snackBar: MatSnackBar, private login:LoginService,private router: Router ) {}

//   onSubmit(){

//     if (!this.loginData.username) {

//       this.snackBar.open('Username is required', 'Close', {
//         duration: 3000,
//       });
//       return;
//     }

//     if (!this.loginData.password) {

//       this.snackBar.open('password is required', 'Close', {
//         duration: 3000,
//       });
//       return;
//     }

//     // console.log('Username:', this.loginData.username);
//     // console.log('password:', this.loginData.password);

//     //request to server to generate token
//     this.login.generateToken(this.loginData).subscribe(
//       (data: any)=> {
//         console.log('Success');
//         console.log(data);

//         //Login
//         this.login.loginUser(data.token);
//         this.login.getCurrentUser().subscribe(
//         (user:any)=>{
//           this.login.setUser(user);
//           console.log(user);

//           //redirect to either admin dashboard
//           //redirect to normal dashboard
//           if(this.login.getUserRole()=="ADMIN"){
//             //admin dashboard
//            // window.location.href='/admin';
//            this.router.navigate(['admin']);
//            this.login.loginStatusSubject.next(true)

//           }
//           else if(this.login.getUserRole()=='General USER'){
//             //user-dashboard
//            // window.location.href='/user-dashboard';
//            this.router.navigate(['user-dashboard/0'])
//            this.login.loginStatusSubject.next(true)

//           }
//           else{
//             this.login.logOut();

//           }
//         }
//         );

//       },
//       (error)=> {
//         console.log("Error !!!");
//         console.log(error);
//         this.snackBar.open("Invalid Details !! Try Again",'',
//         {duration:3000,}
//         )
//       }
//     );
//   }

//   // initiatePasswordReset() {
//   //   // Assuming you have the user's email in this.loginData.email
//   //   this.userService.initiatePasswordReset(this.loginData.email).subscribe(
//   //     (response) => {
//   //       console.log('Password reset initiated:', response);
//   //       // Redirect to the reset-password page
//   //       this.router.navigate(['/reset-password']);
//   //     },
//   //     (error) => {
//   //       console.error('Error initiating password reset:', error);
//   //       // Handle the error, show a message, etc.
//   //     }
//   //   );
//   // }
// }
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: any = {
    username: '',
    password: '',
    email: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.loginData.username) {
      this.snackBar.open('Username is required', 'Close', { duration: 3000 });
      return;
    }

    if (!this.loginData.password) {
      this.snackBar.open('Password is required', 'Close', { duration: 3000 });
      return;
    }

    // Request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Login Success:', data);

        // Save token
        this.login.loginUser(data.token);

        // Get current user and proceed with login flow
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);

            // Check user role and redirect
            const userRole = this.login.getUserRole();
            if (userRole === 'ADMIN') {
              this.router.navigate(['admin']);
            } else if (userRole === 'General USER') {
              this.router.navigate(['user-dashboard/0']);
            } else {
              this.login.logOut();
            }

            // Notify login status
            this.login.loginStatusSubject.next(true);
          },
          (error) => {
            console.error('Error fetching user data:', error);
            this.snackBar.open(
              'Error fetching user data. Please try again.',
              '',
              { duration: 3000 }
            );
          }
        );
      },
      (error) => {
        console.log('Error during login:', error);
        this.snackBar.open('Invalid Details! Try Again.', '', {
          duration: 3000,
        });
      }
    );
  }
}
