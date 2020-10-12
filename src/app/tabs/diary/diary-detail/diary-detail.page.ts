import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary-detail',
  templateUrl: './diary-detail.page.html',
  styleUrls: ['./diary-detail.page.scss'],
})
export class DiaryDetailPage implements OnInit {

  constructor() { }
  onFillComplete = false;
  date = new Date();

  ngOnInit() {
  }
  
  onFillCompleteHandler($event: boolean) {
    this.onFillComplete = true;
  }

  viewMore($event) {

  }
}
