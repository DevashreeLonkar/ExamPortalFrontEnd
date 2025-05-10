import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Question } from '../pages/admin/view-quiz-questions/view-quiz-questions.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  // public getQuestionsOfQuiz(qid: any){
  //   return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  // }
  public getQuestionsOfQuiz(qid: any): Observable<Question[]> {
    return this._http.get<Question[]>(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //add question
  public addQuestion(question: any){
    return this._http.post(`${baseUrl}/question/`, question);
  }
}


