import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { fromEvent, timer } from 'rxjs';
import { debounceTime, delay, map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, AfterViewInit {

  constructor(private el: ElementRef) { }
  avatarElement: HTMLElement;
  orderBtnElement: HTMLElement;
  avatarImgElement: HTMLElement;

  ngOnInit() {
    this.getElements();
  }

  ngAfterViewInit(): void {
    this.touchMoveListerner();
  }

  getElements() {
    this.avatarElement = this.el.nativeElement.querySelector('div.avatar');
    this.orderBtnElement = this.el.nativeElement.querySelector('.order-btn');
    this.avatarImgElement = this.avatarElement.querySelector('img');
    this.avatarImgElement.onload = () => {
      this.avatarElement.style.maxHeight = this.avatarImgElement.offsetHeight + 'px';
    };
  }

  private touchMoveListerner() {
    const touchStart = fromEvent(this.orderBtnElement, 'touchstart');
    const touchMove = fromEvent(this.orderBtnElement, 'touchmove');
    let currentClientY: number;

    touchStart.pipe(switchMap((event: TouchEvent) => {
      currentClientY = event.touches[0].clientY;
      return touchMove;
    })).subscribe((event: TouchEvent) => {
      event.preventDefault();
      const clientY = event.touches[0].clientY;
      const distance = clientY - currentClientY;
      currentClientY = clientY;
      this.avatarElement.style.height = this.avatarElement.offsetHeight + distance + 'px';
    });
  }
}
