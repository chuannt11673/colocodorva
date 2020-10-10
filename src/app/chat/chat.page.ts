import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor() { }

  chat = {
    items: [
      {
        isMyself: true, message: 'Hi, Have a look in the images', images:
          [
            'https://www.w3schools.com/howto/img_snow.jpg',
            'https://www.w3schools.com/howto/img_forest.jpg',
            'https://www.w3schools.com/howto/img_mountains.jpg',
            'https://www.w3schools.com/howto/img_snow.jpg',
            'https://www.w3schools.com/howto/img_forest.jpg'
          ]
      },
      {
        isMyself: false, message: 'Hello, how is the project process ?', images:
          [
            'https://www.w3schools.com/howto/img_snow.jpg',
            'https://www.w3schools.com/howto/img_forest.jpg',
            'https://www.w3schools.com/howto/img_mountains.jpg',
            'https://www.w3schools.com/howto/img_snow.jpg',
            'https://www.w3schools.com/howto/img_forest.jpg'
          ]
      }
    ]
  };

  ngOnInit() {
  }

  onSelectImages(images: any[]) {
    this.chat.items.push({
      isMyself: true,
      message: null,
      images: images.map(x => x.src)
    });

    console.log('chat', this.chat);
  }

}
