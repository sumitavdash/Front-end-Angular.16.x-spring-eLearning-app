import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  qId: any;
  questions: any;

  marksGot =0;
  correctAnswers=0;
  attempted=0;
  unattempted=0;

  isSubmit= false;

  timer: any;
  currentTime: number;

  constructor(private  location_strategy:LocationStrategy,
     private _route:ActivatedRoute,
     private _question:QuestionService){
      this.currentTime = 0;
     }

  ngOnInit(): void {

    this.preventBackOption();
    this.qId=this._route.snapshot.params['qId'];
    console.log(this.qId);
    this.loadQuestions();
    this.updateCurrentTime();
  }
  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qId).subscribe((data: any)=>{
      // console.log(data);
      this.questions=data;
       
      this.timer=  10800;

      // this.questions.forEach((q: { [x: string]: string; })=>{
      //   q['givenAnswer']=''
      // });
       
      console.log(this.questions);
      this.startTimer();
      
      
    },(error)=>{
      console.log(error);
      
      Swal.fire("Error","Error in loading questions of exam", "error");
    });
  }

  updateCurrentTime() {
    // Get the current time in seconds (you can adjust this as needed)
    const now = new Date();
    this.currentTime = Math.floor(now.getTime() / 1000);
  }



  preventBackOption(){
    history.pushState(null, '', location.href);
    this.location_strategy.onPopState(()=>{
      history.pushState(null, '', location.href);
    });

  }


  
  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   if (!this.isSubmit) {
  //     $event.returnValue = 'You have unsaved changes. Are you sure you want to leave the page?';
  //   }
  // }




  submitQuiz(){

    Swal.fire({
      title: 'Do you want to submit the exam?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      // denyButtonText: `Don't start`,
      icon: 'info',
    }).then((e)=>{
      if(e.isConfirmed){

        this.evalQuiz();

        }
        //calculation

         
      });

  }
  startTimer(){
   let t= window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }
  getFormattedTime(){
    let hh = Math.floor(this.timer / 3600);  
    let mm = Math.floor((this.timer % 3600) / 60); 
    let ss = this.timer % 60; 

    return `${hh} hr : ${mm} min : ${ss} sec`;
  }

  evalQuiz(){

    //call to server to evaluate
    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      console.log(data);
      this.marksGot= parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers=data.correctAnswers;
      this.attempted=data.attempted;
      this.unattempted=(this.questions.length - this.attempted);
      this.isSubmit=true;
      
    },
    (error)=>{
      console.log(error);
      
    });

    // this.isSubmit= true;
    //     console.log(this.questions);
    //     this.questions.forEach((q: { givenAnswer: any; answer: any; })=>{
    //       if(q.givenAnswer== q.answer){
    //         this.correctAnswers++
    //        let marksSingle =this.questions[0].quiz.maxMarks/this.questions.length
    //        this.marksGot+= marksSingle;
    //       }

    //       if(q.givenAnswer.trim()!=''){
    //         this.attempted++;
    //       }
           
    //     });
    //     console.log("correct Answer"+ this.correctAnswers);
    //       console.log("Marks Got"+  this.marksGot);
    //       console.log("attempted"+ this.attempted);
          
    //       console.log(this.questions);
          
        
  }
  printPage(){
    window.print();
  }

}
