import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{
  quiz: any;


  constructor(
    private _route: ActivatedRoute, 
    private _quiz: QuizService, 
    private _cat:CategoryService,
    private _router: Router,
  ){}

  qId=0;
  categories: any;

  ngOnInit(): void {
    this.qId= this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any) =>{
        this.quiz =data;
        console.log(this.quiz);
      },
      (error) =>{
        console.log(error);
      }
    );

    this._cat.categories().subscribe((data:any)=>{
      this.categories=data;
    },
    (error)=>{
      alert("Error in loading categories");
    });
  }

  //update for submit
  public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any) =>{
        Swal.fire('Success!!', 'Quiz updated', 'success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        })  ;
      },
      (error)=>{
        Swal.fire('Error!!', 'Error in updating quiz', 'error');
        console.log(error);
      });
  }

}
