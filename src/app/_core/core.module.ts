import { NgModule } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Camera } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        Keyboard,
        EmojiService,
        Camera,
        PhotoLibrary,
        WebView,
        ImagePicker
    ],
})
export class CoreModule {}