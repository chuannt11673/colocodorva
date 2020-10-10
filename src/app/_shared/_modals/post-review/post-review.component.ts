import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.scss'],
})
export class PostReviewComponent implements OnInit {

  constructor(public modal: ModalController) { }

  @Input() post: any;

  ngOnInit() {
    console.log('post', this.post);
  }

  dismissModal() {
    this.modal.dismiss();
  }

}
