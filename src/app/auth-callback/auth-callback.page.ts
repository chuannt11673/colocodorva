import { NavController } from '@ionic/angular';
import { AuthService } from './../_core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.page.html',
  styleUrls: ['./auth-callback.page.scss'],
})
export class AuthCallbackPage implements OnInit {

  constructor(public nav: NavController, public authSerrvice: AuthService) { }

  ngOnInit() {
    this.authSerrvice.completeAuthentication().subscribe(() => {
      this.nav.navigateRoot('tabs');
    });
  }

}
