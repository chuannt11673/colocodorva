import { PostReviewComponent } from './../../_shared/_modals/post-review/post-review.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  constructor(public modal: ModalController) { }
  onFillComplete: boolean;

  ngOnInit() {
  }

  async viewPost(post: any) {
    const modal = await this.modal.create({
      component: PostReviewComponent,
      componentProps: {
        post: post
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  onFillCompleteHandler($event: boolean) {
    this.onFillComplete = true;
  }

  viewMore($event : boolean) {
    console.log($event);
  }
}
