import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  constructor(public modal: ModalController, public nav: NavController) { }
  onFillComplete: boolean;

  ngOnInit() {
  }

  onFillCompleteHandler($event: boolean) {
    this.onFillComplete = true;
  }

  viewMore($event : boolean) {
    console.log($event);
  }

  comment() {
    this.nav.navigateForward('post/1');
  }

  post() {
    this.nav.navigateForward('new-post');
  }
}
