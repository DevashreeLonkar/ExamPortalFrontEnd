import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  constructor(private userService: UserService, private snack: MatSnackBar,
    private router: Router
  ) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  ngOnInit(): void {}
  formSubmit()
  {
    console.log(this.user);
    if(this.user.username=='' || this.user.username== null){
      //alert('User is required !!');
      this.snack.open('Username is required', '',{
        duration:3000,
      });
      return;
    }

    //addUser: userService
    this.userService.addUser(this.user).subscribe(
      (data :any) => {
        console.log(data);
        //alert('successs');
        Swal.fire('Successfully Done !!', 'User ID is ' +data.id, 'success');
        this.router.navigate(["/login"]);
      },
      // (error) => {
      //   console.log(error);
      //   //alert('Something went wrong');
      //   this.snack.open('Something went wrong', '',{
      //     duration:3000,
      //   });
      // }
      (error) => {
        console.log(error);
        this.snack.open(error.error || 'Something went wrong', '', {
          duration: 3000,
        });
      }
    );
  }
  
}
