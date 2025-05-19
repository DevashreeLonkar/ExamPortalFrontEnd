import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  qid: any;
  question: any = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qId: ''
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this._questionService['getQuestion'](this.qid).subscribe(
      (data: any) => {
        this.question = data;
      },
      (error: any) => {
        this._snack.open('Error loading question', '', { duration: 3000 });
      }
    );
  }

  // Update question
  formSubmit() {
    this._questionService['updateQuestion'](this.question).subscribe(
      (data: any) => {
        this._snack.open('Question updated successfully!', '', { duration: 3000 });
        this._router.navigate(['/admin/view-questions/' + this.question.quiz.qId + '/' + this.question.quiz.title]);
      },
      (error: any) => {
        this._snack.open('Error updating question!', '', { duration: 3000 });
      }
    );
  }

}
