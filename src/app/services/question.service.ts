import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) {}

  public getQuestionsOfQuiz(qId: any){

    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`);

  }

  public getQuestionsOfQuizForTest(qId: any){

    return this._http.get(`${baseUrl}/question/quiz/${qId}`);

  }

  public addQuestion(question: any){
    return this._http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId: any){
    return this._http.delete(`${baseUrl}/question/${questionId}`)
  }

  //getting the single question
  public getSingleQuestion(quesId: any){
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  //update question
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`, question);

  }

  //eval Quiz
  public evalQuiz(questions: any){
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions)
  }

  
}
