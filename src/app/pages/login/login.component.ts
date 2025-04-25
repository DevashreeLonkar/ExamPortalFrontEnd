import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
//import { Router } from 'express';
// import { console } from 'inspector';
// import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginData ={
    username:'',
    password:'',
  };

  constructor(private snack: MatSnackBar, private login:LoginService, private router: Router, private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log('Login button clicked');

    if(this.loginData.username.trim() === '' ||  this.loginData.username == null){
      this.snack.open('Username is required', '',{
        duration: 3000,
      });
      return;
    }


    if(this.loginData.password.trim() === '' ||  this.loginData.password == null){
      this.snack.open('Password is required', '',{
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) =>{
        console.log('sucess');
        console.log(data);


        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) =>{
          this.login.setUser(user);
          console.log(user);

          const role = user.authorities?.[0]?.authority ?? '';

          if(this.login.getUserRole() == 'ADMIN'){
         //   window.location.href= '/admin';
         this.router.navigate(['admin']);
         this.login.loginStatusSubject.next(true);
         this.cd.detectChanges();
          }
          
          else if(this.login.getUserRole() == 'NORMAL'){
              //window.location.href= '/user-dashboard'; 
              this.router.navigate(['user-dashboard']) ;
              this.login.loginStatusSubject.next(true);
              this.cd.detectChanges();
          } 
          else{
            this.login.logout();
            this.router.navigate(['/login']);
          }

        });
      },
      (error)=>{
        console.log('Error!');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }

}
