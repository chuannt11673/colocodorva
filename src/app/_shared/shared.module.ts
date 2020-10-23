import { FilledImagesDirective } from './_directives/filled-images.directive';
import { BriefContentDirective } from './_directives/brief-content.directive';
import { IonicModule } from '@ionic/angular';
import { MessageBoxComponent } from './message-box/message-box.component';
import { CoreModule } from './../_core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CDVPhotoLibraryPipe } from './_pipes/cdvphotolibrary.pipe';
import { SafeHtmlPipe } from './_pipes/safe-html.pipe';
import { MasonryDirective } from './_directives/masonry.directive';

@NgModule({
    declarations: [
        MessageBoxComponent,
        CDVPhotoLibraryPipe,
        SafeHtmlPipe,
        BriefContentDirective,
        FilledImagesDirective,
        MasonryDirective
    ],
    imports: [
        CommonModule,
        IonicModule,
        CoreModule,
        PickerModule,
        EmojiModule
    ],
    exports: [
        MessageBoxComponent,
        CDVPhotoLibraryPipe,
        SafeHtmlPipe,
        BriefContentDirective,
        FilledImagesDirective,
        MasonryDirective
    ],
    entryComponents: [
    ],
    providers: [
    ],
})
export class SharedModule { }
