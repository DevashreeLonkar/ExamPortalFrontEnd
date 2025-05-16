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

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit=false;

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
        this.questions.forEach((q: { [x: string]: string; })=>{
          q['givenAnswer']='';
        });
        // console.log(this.questions);
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

  submitQuiz(){
    Swal.fire({
          title: "Do you want to submit the quiz?",
          showCancelButton: true,
          confirmButtonText: 'Submit',
          denyButtonText: `Don't submit`,
          icon: 'info',
        }).then((e)=>{
          if(e.isConfirmed){
            //Calculation
            this.isSubmit=true;
            this.questions.forEach((q: any)=>{
              if(q.givenAnswer == q.answer){
                this.correctAnswers++;
                let marksSingle= this.questions[0].quiz.maxMarks / this.questions.length;
                this.marksGot+= marksSingle;
              }

              if(q.givenAnswer.trim() !=null){
                this.attempted++;
              }
            });

            console.log('Correct answers: ' +this.correctAnswers);
            console.log('Marks Got: ' +this.marksGot);
            console.log(this.questions);
          }
        });
  }

}
