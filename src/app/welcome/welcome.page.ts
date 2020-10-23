import { AuthService } from './../_core/services/auth.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';

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
    const returnUrl = encodeURI('http://localhost:8100/');
    const loginUrl = `http://localhost:56271/External/Challenge?provider=Google&returnUrl=${returnUrl}`;
    if (environment.production) {
      const loginBrowser = this.inAppBrowser.create(loginUrl);
      loginBrowser.on('loadstop')?.subscribe((event: any) => {
        const url = event.url;
        if (url === decodeURI(returnUrl)) {
          loginBrowser.close();
        }
      });
      loginBrowser.show();
    } else {
      window.location.replace(loginUrl);
    }
  }

  login() {
    this.authService.login('chuannt11673@gmail.com', '@Chuan123').subscribe(() => {
      this.nav.navigateForward('tabs');
    });
  }
}
