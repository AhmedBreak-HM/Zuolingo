import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe(userFromFirebase => {
      userFromFirebase != null ? this.router.navigate(['/tabs']) : '';
      if (userFromFirebase) {
        this.userService.getUserById(userFromFirebase.uid).subscribe(res => {
          this.authService.user.displayName = res.displayName;
          this.authService.user.admin = res.admin;
          this.authService.user.photoURL = res.photoURL;
        });
      }
    });
  }
  onSubmit() {
    this.authService.Login(this.user.email, this.user.password).then(() => {
      this.router.navigate(['/tabs']);
    }).catch(err => console.log(err));
  }
  async logInGoogle() {
    const credential = await this.authService.SignUpGoogle();
    return this.updateUserData(credential.user).then(() => {
      this.router.navigate(['/tabs']);
    });
  }
  async logInFacebook() {
    const credential = await this.authService.SignUpFacebook();
    return this.updateUserData(credential.user).then(() => {
      this.router.navigate(['/tabs']);
    });
  }
  private updateUserData(user) {
    // Sets user data to firestore on login
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      admin: true
    };
    return this.userService.addUser(user.uid, data);
  }

}
