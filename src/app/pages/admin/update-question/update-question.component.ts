import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  public Editor=ClassicEditor;

  constructor(private _question:QuestionService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _quiz:QuizService){}
     
    quesId=0;
    question: any;
    quizzes:any;
    qId: any;
    title: any;


  ngOnInit(): void {

    this.quesId=this._route.snapshot.params['quesId'];
    alert(this.quesId);
    // Retrieve qId and title from route parameters
    this._route.params.subscribe((params) => {
      this.qId = params['qId'];
      this.title = params['title'];
    });
    this._question.getSingleQuestion(this.quesId).subscribe(
      (data:any)=>{
        this.question=data;
        console.log(this.question);
      },
      (error)=>{
        console.log(error);
      }
    );
    this._quiz.quizzes().subscribe((data: any)=>{
      this.quizzes= data;
    },
    (error)=>{
      alert("Error in loading quizzes");
    });
    
  }
  //update Question Data
  public updateQuestionData(){

    // alert("test");
    //validate
    console.log("yes");
    
    this._question.updateQuestion(this.question).subscribe((data)=>{
      Swal.fire("Success !!!","Question updated ","success").then((e)=>{
         
        this._router.navigate([`/quiz/${this.qId}/${this.title}`]);
      })

    },
    (error)=>{
      Swal.fire("Error","Error in updating question", "error");
    });
  }
}

    
  


