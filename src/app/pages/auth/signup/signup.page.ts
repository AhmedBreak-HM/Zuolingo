import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user: User = new User();
  confirmPassword: string ;
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  // signUp(){
  //   console.log(this.user);
  // }


  signUp() {
    this.user.photoURL = '';
    this.authService.SignUp(this.user.email, this.user.password)
      .then(data => {
        this.userService.addUser(data.user.uid, { ...this.user }).then(() => {
          this.router.navigate(['/tabs']);
        });
      })
      .catch(err => console.log(err));
  }


}
