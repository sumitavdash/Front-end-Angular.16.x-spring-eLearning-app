import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email:string;
  id: number;
  phone: string;
  authorities: { authority: string }[];
  enabled: boolean;

   
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: User | null= null;  
  editing = false;

  editableFirstName: string = '';
  editableLastName: string = '';
  editableUsername: string = '';
  editablePhone: string = '';
   editableEmail: string = '';

   
  constructor(private login:LoginService, private _user: UserService,private _router:Router){

  }


  ngOnInit(): void{


     
    //if i want to fetch data from localStorage
   
    this.user= this.login.getUser();

    //if i want to fetch data from server
    
  // this.login.getCurrentUser().subscribe(
   // (user: any)=>{
   //   this.user=user;
   // },
   // (_error)=>{
   //   alert('_error');
   // }
   //);
   }


   toggleEdit() {
    this.editing = !this.editing;
    if (this.editing && this.user) {
      this.editableFirstName = this.user.firstName;
      this.editableLastName = this.user.lastName;
      this.editableUsername = this.user.username;
      this.editablePhone = this.user.phone;
       this.editableEmail = this.user.email;
    }
  }


   public updateUser(){

    if (this.user) {
      const updatedUser = {
        id: this.user.id,
        firstName: this.editableFirstName,
        lastName: this.editableLastName,
        username: this.editableUsername,
        phone: this.editablePhone,
         email:this.editableEmail,
      };

    this._user.saveUser(this.user.id, updatedUser).subscribe((data:any) => {

      // if( this.user &&this.user.username == null){
      //   return;
      // }
       
      console.log('User updated successfully');
      Swal.fire("Success","profile updated","success");
      this.user=data;
      this.editing = false; 
      this._router.navigate(['/profile']);
    }, (error)=> {
      console.error('Error updating user:', error);
      Swal.fire("Error","Error in updating profile","error");
    });
     }
  }

   }
  