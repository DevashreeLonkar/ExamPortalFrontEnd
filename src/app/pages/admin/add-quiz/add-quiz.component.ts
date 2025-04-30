import { Component, OnInit } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{

  categories=[
    {
      cid:2,
      title:'Programming',
    },

    {
      cid:2,
      title:'Programming 1',
    },
  ]

  constructor(){}
  ngOnInit(): void {
    
  }

}
