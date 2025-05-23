import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  user: User | null = null;
  
  constructor(private login: LoginService){}
  
  ngOnInit(): void {
  //this.user= this.login.getUser();
  this.login.getCurrentUser().subscribe(
    (user: any) => {
      this.user = user;
      this.login.setUser(user);  // optional: update localStorage if needed
    },
    (error)=>{
      console.log(error);
      alert('error');
    }
   );
  }

  
}
