import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { error } from 'console';
import e from 'express';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{
  category= {
    title:'',
    description:'',
  };

  constructor(private _category:CategoryService, private _snack:MatSnackBar){}
  ngOnInit(): void {}

  formSubmit(){
    if(this.category.title.trim() == '' || this.category.title == null){
      this._snack.open('Title Required', '',{
        duration:3000
      });
      return;
    }

    //all done
    this._category.addCategories(this.category).subscribe(
      (data:any) => {
        this.category.title='';
        this.category.description='';
        Swal.fire('Sucess!!', 'Category is addedd suessfully', 'success');
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error', 'Server error', 'error');
      }
    );
  }
}
