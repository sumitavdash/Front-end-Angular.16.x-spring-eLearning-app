import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../services/password-reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string = '';
   
  resetInitiated: boolean = false;


  constructor( private passwordResetService: PasswordResetService,
    private router: Router,
    private route: ActivatedRoute){}




  ngOnInit(): void {

     
    

  }
   
  initiatePasswordReset() {
    this.passwordResetService.initiatePasswordReset(this.email).subscribe(
      response => {
        console.log('Password reset initiated:', response);
        this.resetInitiated = true;
        this.router.navigate(['/complete-reset'], { queryParams: { token: response.token } });
      },
      error => {
        console.error('Error initiating password reset:', error);
         
      }
    );
  }

   
}


