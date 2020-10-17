import { AuthService } from './../_core/services/auth.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public nav: NavController, public authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.nav.navigateRoot('tabs');
  }
}
