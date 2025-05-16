import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import e from 'express';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;

  constructor(private _locationSt:LocationStrategy, 
    private _route:ActivatedRoute,
    private _question: QuestionService,
  ){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid= this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      });
  }

  preventBackButton(){
    history.pushState(null, '', location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null, '', location.href);
    });
  }

}
