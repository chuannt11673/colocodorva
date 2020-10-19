import { Component, ElementRef, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImagePickerOptions } from '@ionic-native/image-picker';
import { from } from 'rxjs';
import { UriToBase64 } from 'src/app/_core/canvas';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit, AfterViewInit {

  private newNode: any;
  private sourceTypes = {
    library: 1,
    video: 2
  };

  disableImage = false;
  disableVideo = false;
  disableTextbox = false;
  disableSendbtn = false;
  oDoc: HTMLDivElement;
  @Input('disable-image') set setDisableImage(value: boolean) { this.disableImage = value; }
  @Input('disable-video') set setDisableVideo(value: boolean) { this.disableVideo = value; }
  @Input('disable-textbox') set setDisableTextbox(value: boolean) { this.disableTextbox = value; }
  @Input('disable-sendbtn') set setDisableSendbtn(value: boolean) { this.disableSendbtn = value; }
  @Input('odoc') set setEditableDiv(value: any) { this.oDoc = value; }
  @Output() send: EventEmitter<any> = new EventEmitter();
  @Output() selectEmoji: EventEmitter<any> = new EventEmitter();
  @Output() selectImages: EventEmitter<any> = new EventEmitter();

  sourceType: number;
  isShowEmoji = false;
  imageBase64Items: any[] = [];
  isInput = false;

  actionArea: HTMLElement;
  actionHeight: number;
  backgroundImageUrl = '/assets/images/icons-v3.png';
  backgroundImageFn = () => this.backgroundImageUrl;


  constructor(
    public actionSheetController: ActionSheetController,
    private ele: ElementRef,
    private modalController: ModalController,
    private emoji: EmojiService,
    public keyboard: Keyboard,
    private camera: Camera,
    private webview: WebView,
    private imagePicker: ImagePicker
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.subscribeKeyboard();
    if (!this.oDoc) {
      this.oDoc = this.ele.nativeElement.querySelector('#textBox');
    }

    if (this.oDoc) {
      this.oDoc.addEventListener('focus', () => { this.isInput = true; });
      this.oDoc.addEventListener('blur', () => { if (!this.oDoc.innerHTML) { this.isInput = false; } });
    }

    setTimeout(() => {
      this.actionArea = this.ele.nativeElement.querySelector('.action-area') as HTMLElement;
      this.actionHeight = - this.actionArea.offsetHeight;
      this.resetTopStyle();
    }, 100);
  }

  ionViewDidEnter() {
  }

  subscribeKeyboard() {
    window.addEventListener('keyboardWillShow', (event: any) => {
      this.isShowEmoji = false;
      this.resetTopStyle();
    });
  }

  onChangeEmoji() {
    this.isShowEmoji = !this.isShowEmoji;
    this.resetTopStyle();
  }

  resetTopStyle() {
    if (this.isShowEmoji) {
      this.actionArea.style.top = `${this.actionHeight}px`;
      this.actionArea.style.height = `${(this.actionHeight + 56) * -1}px`;

      setTimeout(() => {
        this.ele.nativeElement.parentElement.style.marginTop = `${Math.abs(this.actionHeight)}px`;
      }, 300);
    }
    else {
      this.actionArea.style.top = '-56px';
      this.ele.nativeElement.parentElement.style.marginTop = '56px';
    }
  }

  addEmoji(event: any) {
    if (this.disableTextbox && !this.oDoc) {
      this.selectEmoji.emit(event);
      return;
    }

    this.newNode = document.createElement('span');
    this.newNode.innerHTML = '&nbsp;';
    const emoji = this.createEmojiHtml(event.emoji);
    this.insertTextAtCursor(emoji);
    this.insertAfter(emoji);
    this.focus(() => this.oDoc.blur());
  }

  insertTextAtCursor(node: Node) {
    let range: Range;
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount && this.oDoc.contains(sel.focusNode)) {
      range = sel.getRangeAt(0);
      range.insertNode(node);
    }
    else {
      this.oDoc.appendChild(node);
    }
  }

  focus(callback: any) {
    if (!this.newNode) {
      return;
    }

    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(this.newNode, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    if (callback) {
      callback();
    }
  }

  createEmojiHtml(emoji: any) {
    const el = document.createElement('div');
    Object.assign(el.style, this.createStyles(emoji));
    return el;
  }

  createStyles(emoji: any) {
    const styles: any = this.emoji.emojiSpriteStyles(emoji.sheet, 'twitter');
    styles.margin = '0';
    styles['vertical-align'] = 'middle';
    styles['background-image'] = `url(${this.backgroundImageUrl})`;
    return styles;
  }

  insertAfter(referenceNode: any) {
    referenceNode.parentNode.insertBefore(this.newNode, referenceNode.nextSibling);
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  post() {
    const returnVal = {
      message: this.oDoc.innerHTML,
      imageBase64Items: this.imageBase64Items
    };
    this.send.emit(returnVal);
    this.oDoc.innerHTML = null;
    this.resetTopStyle();
  }

  //#region Camera
  pickImage(sourceType: any) {
    const options = {
      quality: 80,
      sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      const base64Image = imageData;
      this.imageBase64Items.push(base64Image);
    }, () => {
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  //#endregion

  //#region Image picker

  selectImagePicker() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 10,
      width: 1080,
      quality: 80
    };

    const getImages = from(this.imagePicker.getPictures(options));
    getImages
      .subscribe((res: string[]) => {
        if (res.length > 0) {
          const images = res.map(imageUri => {
            const image = {
              src: this.webview.convertFileSrc(imageUri),
              base64: null
            };

            UriToBase64(imageUri, (base64: string) => {
              image.base64 = base64;
            });

            return image;
          });

          this.selectImages.emit(images);
        }
      });
  }
  //#endregion
}
