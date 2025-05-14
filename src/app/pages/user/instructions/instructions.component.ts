import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit{
  qid: any;
  quiz: any;
  constructor(private _route:ActivatedRoute, private _quiz:QuizService){}

  ngOnInit(): void {
    this.qid= this._route.snapshot.params['qid'];
    
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz=data;
      },
      (error)=>{
        console.log(error);
        alert('Error in loading quiz data');
      });
  }
}
