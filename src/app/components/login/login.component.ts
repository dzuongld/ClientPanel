import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;
  email: string;

  constructor(
    private auth: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.getAuth().subscribe(auth => {
      // check if logged in
      if (auth) {
        this.router.navigate(['/']); // redirect to dashboard
      }
    });
  }

  onSubmit() {
    // .then on returned promised
    this.auth.login(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now logged in!', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/']); // go to dashboard if success
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }

}
