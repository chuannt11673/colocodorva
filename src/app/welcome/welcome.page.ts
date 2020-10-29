import { AuthService } from './../_core/services/auth.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    public nav: NavController,
    public authService: AuthService,
    public inAppBrowser: InAppBrowser) { }

  ngOnInit() {
  }

  facebookLogin() {
    this.authService.authorize('Facebook').subscribe(() => {
      this.nav.navigateRoot('tabs');
    }, err => { });
  }

  googleLogin() {
    this.authService.authorize('Google').subscribe(() => {
      this.nav.navigateRoot('tabs');
    }, err => { });
  }

  login() {
    this.nav.navigateRoot('tabs');
  }
}
