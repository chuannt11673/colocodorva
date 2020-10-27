import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_core/services/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.page.html',
  styleUrls: ['./auth-callback.page.scss'],
})
export class AuthCallbackPage implements OnInit {

  constructor(public nav: NavController,
              public authService: AuthService) { }

  ngOnInit() {
    this.authService.authorizeHandler().subscribe(_ => {
      const event = new Event('loggedIn');
      window.opener.window.document.dispatchEvent(event);
      window.close();
    });
  }

}
