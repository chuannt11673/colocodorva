import { AuthService } from './../_core/services/auth.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    public nav: NavController,
    public authService: AuthService,
    public inAppBrowser: InAppBrowser,
    public oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
  }

  facebookLogin() {
    this.oidcSecurityService.authorize();   
  }

  login() {
    this.authService.login('chuannt11673@gmail.com', 'Root@123').subscribe(() => {
      this.nav.navigateForward('tabs');
    });
  }
}
