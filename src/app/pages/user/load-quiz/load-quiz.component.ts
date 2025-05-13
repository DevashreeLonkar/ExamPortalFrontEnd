import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error, log } from 'console';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit{
  catId: any;
  quizzes: any;
constructor(private _route:ActivatedRoute, private _quiz:QuizService){}

  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
      this.catId= params['catId'];
      if(this.catId == 0){
        console.log('Load all the Quiz');
    
        this._quiz.quizzes().subscribe(
          (data:any)=>{
            this.quizzes=data;
            console.log(this.quizzes);
          },
          (error) =>{
            console.log(error);
            alert('Error in loading all Quizzes');
          });
      } else{
        console.log('Load specific Quiz');
        this._quiz.getQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes=data;
          },
          (error)=>{
            alert('Error in loading data')
          });
      }
    });
  }

}
