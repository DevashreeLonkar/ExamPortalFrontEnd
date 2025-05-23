import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  categories: any;
  user: User | null = null;

  constructor(private _cat:CategoryService, private _snack:MatSnackBar){}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        this._snack.open('Error in loading categories from server','',{
          duration:3000,
        });
      });
  }
  
}
