import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';



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
    private _question: QuestionService,
    private _snack:MatSnackBar
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

  //delete question
  deleteQuestion(qid: any){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure you want delete this Question?',
    }).then((result) =>{
        if(result.isConfirmed){
          this._question.deleteQuestion(qid).subscribe((data)=>{
            this._snack.open('Question deleted' ,'', {
              duration:3000,
            });
            this.questions= this.questions.filter((q) => q.quesId != qid);
          },
          (error)=>{
            this._snack.open('Error in deleting questions', '', {
              duration:3000,
            });
            console.log(error);
          }
        );
        }
    });
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
