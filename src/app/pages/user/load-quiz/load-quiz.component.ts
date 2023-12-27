import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{

  catId: any;
   quizzes: any;

  constructor(private _route: ActivatedRoute, private _quiz:QuizService, private _snack:MatSnackBar){}

  ngOnInit(): void {
     

    this._route.params.subscribe((params)=>{

      this.catId=params['catId'];
      if(this.catId==0){
         console.log("Load All Exams");
        this._quiz.getActiveQuizzes().subscribe((data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
        },
        (error)=>{
  
          console.log(error);
          
          this._snack.open("Error in loading all exams", "Close",{
            duration:3000,
          });
  
        });
      }
      
      else{
        console.log("Load Specific Exam");
         this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
          

         },
         (error)=>{

          alert("error in loading");
          console.log(error);
          // this._snack.open("Error in loading exam data", "Ok",{
          //   duration: 3000,
          // });
         });
      }
    });
     
     
    
  }

}
