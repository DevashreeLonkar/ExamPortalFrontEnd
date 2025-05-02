import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any[] = [];
//   quizzes= [
//     {
//       qid:2,
//       title:'Basic Java Quiz',
//       description: 'This is Core java Quiz',
//       maxMarks: '50',
//       numberOfQuestions: '20',
//       active:'',
//       category:{
//         title: 'Programming',
//       }
//     },

//     {
//       qid:2,
//       title:'Basic Java Quiz',
//       description: '',
//       maxMarks: '50',
//       numberOfQuestions: '20',
//       active:'',
//       category:{
//         title: 'Programming',
//      },
//     },
//   ];


  constructor(private _quiz: QuizService){}
  ngOnInit(): void {
  
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  //delete quiz
  deleteQuiz(qid: any){
 
    Swal.fire({
      icon:'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //delete
        this._quiz.deleteQuiz(qid).subscribe((data)=>{
          this.quizzes= this.quizzes.filter((quiz) => quiz.qid != qid);
          Swal.fire('Success !!', 'Quiz Deleted', 'success');
        },
      (error)=>{
        Swal.fire('Error !!', 'Error in deleting quiz', 'error');
      });
      }
    });
  }
}
