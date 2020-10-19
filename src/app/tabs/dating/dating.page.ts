import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dating',
  templateUrl: './dating.page.html',
  styleUrls: ['./dating.page.scss'],
})
export class DatingPage implements OnInit {

  constructor() { }
  options: any = {
    itemSelection: '.card'
  };
  isCompleted = false;

  ngOnInit() {
  }

  completed($event: boolean) {
    this.isCompleted = $event;
  }
}
