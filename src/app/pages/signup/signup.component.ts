import { Component } from '@angular/core';
import{MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  public signUpForm: FormGroup; // Declare the form group variable
   

  constructor(private snackBar: MatSnackBar,
              private userService:UserService,
              private formBuilder: FormBuilder) 
              
              {
                // validation
                
                this.signUpForm = this.formBuilder.group({
                  username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
                  password: ['', [Validators.required, Validators.minLength(8),this.validatePasswordStrength]],
                  firstName: ['', [Validators.required]],
                  lastName: ['', [Validators.required]],
                  // email: ['', [Validators.required, Validators.email]],
                  email: ['', [Validators.required, Validators.email, this.validateGmail]],
                  phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
                  
                });
               }
               

               submitForm() {
                if (this.signUpForm.invalid) {
                  this.openSnackBar('Please fill all the required fields correctly.');
                  return;
                }

                 
                this.openSnackBar('Successfully Submitted');
            
                // Call the userService to add the user using this.signUpForm.value
                this.userService.addUser(this.signUpForm.value).subscribe(
                  (data: any) => {
                    // Success
                    console.log(data);
                    Swal.fire('Successfully registered', 'Username is ' + data.username, 'success');
                    this.resetForm();
                  
                  },
                  (error: any) => {
                    // Error
                    console.log(error);
                     
                    Swal.fire('Something Went Wrong', 'Username Already Existed', 'error');
                  }
                  
                );
              }
            
              resetForm() {
                this.signUpForm.reset();
              }
            
              private openSnackBar(message: string) {
                this.snackBar.open(message, 'Ok', {
                  duration: 3000 // Display duration in milliseconds
                });
              }
              private validatePasswordStrength(control: AbstractControl): { [key: string]: boolean } | null {
                const value: string = control.value;
            
                // Check if the password contains at least one uppercase letter, one lowercase letter,
                // one numeric digit, and one special character.
                const uppercaseRegex = /[A-Z]/;
                const lowercaseRegex = /[a-z]/;
                const numericRegex = /[0-9]/;
                const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
            
                if (
                  !uppercaseRegex.test(value) ||
                  !lowercaseRegex.test(value) ||
                  !numericRegex.test(value) ||
                  !specialCharacterRegex.test(value)
                ) {
                  return { 'passwordStrength': true };
                }
            
                return null;
              }
              private validateGmail(control: AbstractControl): { [key: string]: boolean } | null {
                const value: string = control.value;
            
                // Check if the email ends with "@gmail.com"
                if (!value.toLowerCase().endsWith('@gmail.com')) {
                  return { 'gmailFormat': true };
                }
            
                return null;
              }
                
   
            }
            
            
            
            
            
            
            
            