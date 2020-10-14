import { AuthService } from './_core/services/auth.service';
import { Component } from '@angular/core';

import { MenuController, Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private nav: NavController,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.auth.initUser().subscribe();
      this.auth.completeSignOut().subscribe();
    });
  }

  signout() {
    this.auth.signOut().subscribe(() => {
      this.menu.close('main-menu');
      this.nav.navigateRoot('');
    });
  }
}
