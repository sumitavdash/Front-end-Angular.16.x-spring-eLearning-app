import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from '../services/password-reset.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complete-reset-password',
  templateUrl: './complete-reset-password.component.html',
  styleUrls: ['./complete-reset-password.component.css']
})
export class CompleteResetPasswordComponent implements OnInit{


  token!: string;
  newPassword!: string;


  constructor(private passwordResetService: PasswordResetService,
    private router: Router,
    private route: ActivatedRoute){
       
        
    }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  completePasswordReset() {
    const data = { token: this.token, newPassword: this.newPassword };

    this.passwordResetService.completePasswordReset(data).subscribe(
      response => {
        Swal.fire('Error','Error in password reset','error');
           
          // this.router.navigate(['/login']);
        
      },
      error => {
        // console.error('Error completing password reset:', error);
        console.log(error);
        Swal.fire('Success', 'Password reset successfully completed', 'success');
        this.router.navigate(['/login']);
         
         
      }
    );
  }
}
