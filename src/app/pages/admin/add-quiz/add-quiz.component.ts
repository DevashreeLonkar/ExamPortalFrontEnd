import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{

  categories: any[] = [];
  // categories=[
  //   {
  //     cid:2,
  //     title:'Programming',
  //   },

  //   {
  //     cid:2,
  //     title:'Programming 1',
  //   },
  // ]

  constructor(private _cat:CategoryService){}
  ngOnInit(): void {
    
    this._cat.categories().subscribe(
      (data: any)=>{
        //categories load
        this.categories=data;
        console.log(this.categories);
      },

      (error)=>{
        console.log(error);
        Swal.fire('Error!!', 'Error in loading data from Server','error');
      }
    );
  }

}
