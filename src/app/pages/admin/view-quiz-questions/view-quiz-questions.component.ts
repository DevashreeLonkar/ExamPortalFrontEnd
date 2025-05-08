import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { error } from 'console';



@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: any;
  qTitle: any;
// questions =[];
questions: any[] = [];
  constructor(private _route: ActivatedRoute,
    private _question: QuestionService
  ){}

  ngOnInit(): void {
    
    this.qId= this._route.snapshot.params['qid'];
    this.qTitle= this._route.snapshot.params['title']; 
    // this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=> {
    //   console.log(data);
    //   this.questions= data;
    // },
    // (error)=>{
    //   console.log(error);
    // });
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
    
  }
}


export interface Question {
  quesId: number;
  content: string;
  image?: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer?: string;
  quiz?: any; // you can also type quiz properly if needed
}
