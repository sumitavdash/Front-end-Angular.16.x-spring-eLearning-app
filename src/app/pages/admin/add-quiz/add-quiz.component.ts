import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any[] = [];

   quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:'true',
  category: {
    cid:'',
  },
  };

  constructor(private _cat:CategoryService, private snack: MatSnackBar, private _quiz:QuizService) {}

  ngOnInit(): void {

    this._cat.Categories().subscribe(
      (data:any)=>{
        //categories load
        this.categories=data;
       // console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !','error in loading data from server','error');
      }
    );
    
  }
  //add quiz
  addQuiz(){
     if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this.snack.open("title Required !!", 'Ok',{
        duration:3000,
      });
      return;
     }
     if(this.quizData.description.trim()=='' || this.quizData.description==null){
      this.snack.open("description Required !!", 'Ok',{
        duration:3000,
      });
      return;
     }
     if(this.quizData.maxMarks.trim()=='' || this.quizData.maxMarks==null){
      this.snack.open("maxMarks Required !!", 'Ok',{
        duration:3000,
      });
      return;
     }
     if(this.quizData.numberOfQuestions.trim()=='' || this.quizData.numberOfQuestions==null){
      this.snack.open("numberOfQuestions Required !!", 'Ok',{
        duration:3000,
      });
      return;
     }
     //validation.. for others


     //call server
     this._quiz.addQuiz(this.quizData).subscribe(
      (_data)=>{
        Swal.fire('Success','Quiz Added HURRAY!','success');

        //data clear
       this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:'true',
        category: {
          cid:'',
        },
        };
      },
      (error)=>{
        Swal.fire('Error!!','Error While Adding Quiz','error');
        console.log(error);
      }

     );
  }

}
