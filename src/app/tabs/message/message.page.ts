import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(private nav: NavController) { }
  date = new Date();

  ngOnInit() {
  }

  chat() {
    this.nav.navigateForward('chat');
  }
}
