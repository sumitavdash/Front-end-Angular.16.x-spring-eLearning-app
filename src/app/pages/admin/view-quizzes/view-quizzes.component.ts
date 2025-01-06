import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
[x: string]: any;

  quizzes: {
    active: any;
    qId: number;
    title: string;
    category: {
      title: string;
    };
    description: string;
    maxMarks: number;
    numberOfQuestions: number;
     
  }[] = [];



  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !',"Error In Loading Data !", 'error');
      }
    );
    
  }
  //deleting quizzes  its a unique and wow technique in angular documentation
  deleteQuiz(qId:any){
      
    Swal.fire({
      icon:'info',
      title:'Are You Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,


    }).then((result)=>{
      if(result.isConfirmed){

        //deleting quiz
        this._quiz.deleteQuiz(qId).subscribe(
          (_data)=>{
    
            //eka sangare delte hele ui ru bhi instantly hateibaku filter option use karibi
           this.quizzes= this.quizzes.filter((quiz)=>quiz.qId!= qId);
    
            Swal.fire('Success','Quiz Deleted','success');
    
          },
          (_error)=>{
    
            Swal.fire('Error','Error In Deleting Quiz','error');
    
          }
         );

      }
    });
  }

}
