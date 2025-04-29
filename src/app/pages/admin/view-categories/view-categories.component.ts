import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

interface Category {  // Define the interface here
  title: string;
  description: string;
}

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

}
