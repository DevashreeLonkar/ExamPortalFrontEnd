import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(private _cat:CategoryService){}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        
      }
    )
  }

}
