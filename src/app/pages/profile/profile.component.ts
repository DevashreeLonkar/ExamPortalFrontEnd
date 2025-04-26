import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { error } from 'console';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  enabled: boolean;
  authorities: { authority: string }[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  //styleUrl: './profile.component.css'
  styleUrls: ['./profile.component.css']

  
})
export class ProfileComponent implements OnInit{
  //user= null;
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
