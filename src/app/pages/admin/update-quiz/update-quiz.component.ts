import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
 



  constructor(private _route:ActivatedRoute, 
    private _quiz:QuizService, 
    private _cat:CategoryService,
    private _router:Router) {}

  qId=0;
  quiz: any;
  categories:any;

  ngOnInit(): void {

    this.qId=this._route.snapshot.params['qId'];
    alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );
    this._cat.Categories().subscribe((data: any)=>{
      this.categories= data;
    },
    (error)=>{
      alert("Error in loading categories");
    });
    
  }
  //update Quiz
  public updateData(){

    // alert("test");
    //validate
    console.log("yes");
    
    this._quiz.updateQuiz(this.quiz).subscribe((data)=>{
      Swal.fire("Success !!!","Exam updated ","success").then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });

    },(error)=>{
      Swal.fire("Error","Error in updating Exam", "error");
    });
  }

}
