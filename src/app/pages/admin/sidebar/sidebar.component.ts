import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  isLoggedIn= false;
  user: any = null;

  constructor(public login: LoginService){
  }
  
  ngOnInit(): void {
  }

  public logout(){
    this.login.logout();
    window.location.reload();
    this.isLoggedIn=false;
    this.user= null;

  }
 
}
