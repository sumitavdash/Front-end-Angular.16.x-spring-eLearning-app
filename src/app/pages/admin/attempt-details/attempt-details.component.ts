import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attempt-details',
  templateUrl: './attempt-details.component.html',
  styleUrls: ['./attempt-details.component.css']
})
export class AttemptDetailsComponent implements OnInit {
 
  

  userDetails: {
    enabled: any;
    id: number;
    username: string;
     email: string;
     phone: string;
     action:any;
     delete:any;

     
  }[] = [];


  dataSource!: MatTableDataSource<any>;
  displayedColumns = [ 'id', 'username', 'email', 'phone', 'enabled','actions','delete'];
  
   


  constructor(private _quiz:QuizService,
    private _cat:CategoryService,
    private _user:UserService,
    private _snack:MatSnackBar){

  }

  ngOnInit(): void {

//I CAN NOT DO BECAUSE I HAVE MADE AN ERROR NO RELATIONSHIP
// I HAVE NOT ESTABLISHED BETWEEN USER AND EXAM SECTION
    // this._quiz.quizzes().subscribe(
    //   (data:any)=>{
    //     this.quizzess=data;
    //     console.log(this.quizzess);
    //   },
    //   (error)=>{
    //     console.log(error);
        // Swal.fire('Error !',"Error In Loading Data !", 'error');
    //   }
    // );

    this. _user.getAllUsers().subscribe((data:any)=>{
      this.userDetails=data;
      console.log(this.userDetails);
      
    },(error:any)=>{
      console.log(error);
      
    });
    

  }
  toggleUserStatus(user: any): void {
    // Invert the user's enabled status
    const newStatus = !user.enabled;
  
    // Call the user service to update the user status in the database
    this._user.saveUser(user.id, { enabled: newStatus }).subscribe(
      () => {
        // Update the local data (userDetails array)
        const index = this.userDetails.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          // Update only the 'enabled' property
          this.userDetails[index].enabled = newStatus;
  
          // Display a success message
          this._snack.open(
            `User ${user.username} ${newStatus ? 'enabled' : 'disabled'} successfully.`,
            'Close',
            { duration: 3000 }
          );
        } else {
          // If the user is not found in the local data, fetch the updated user details
          this._user.getuserbyId(user.id).subscribe(
            (fullUserDetails) => {
              // Update the local data with the full user details
              this.userDetails.push(fullUserDetails);
  
              // Display a success message
              this._snack.open(
                `User ${fullUserDetails.username} ${
                  fullUserDetails.enabled ? 'enabled' : 'disabled'
                } successfully.`,
                'Close',
                { duration: 3000 }
              );
            },
            (error) => {
              console.error('Error fetching user details after update:', error);
              this._snack.open(
                'Error fetching updated user details. Please refresh the page.',
                'Close',
                { duration: 3000 }
              );
            }
          );
        }
      },
      (error) => {
        // Handle error and display a notification
        console.error('Error updating user status:', error);
        this._snack.open('Error updating user status. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }
  
deleteUser(user: any): void {
  // Call the deleteUser method with the userId from the selected user
  this._user.deleteUser(user.id).subscribe(
    () => {
      // Remove the user from the local data (userDetails array)
      this.userDetails = this.userDetails.filter((u) => u.id !== user.id);

      // Display a success message
      this._snack.open(`User ${user.username} deleted successfully.`, 'Close', { duration: 3000 });

      // Optionally, you can trigger a refresh to get the latest user list
      this.refreshUserList();
    },
    (error) => {
      // Handle error and display a notification
      console.error('Error deleting user:', error);
      this._snack.open('Error deleting user. Please try again.', 'Close', { duration: 3000 });
    }
  );
}

refreshUserList(): void {
  // Fetch the latest user list
  this._user.getAllUsers().subscribe(
    (data: any) => {
      this.userDetails = data;
    },
    (error: any) => {
      console.log(error);
    }
  );
}

}
 




  
  

  


