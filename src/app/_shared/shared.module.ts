import { MasonryDirective } from './_directives/masonry.directive';
import { MaterialModule } from './material.module';
import { PostReviewComponent } from './_modals/post-review/post-review.component';
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
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
    declarations: [
        MessageBoxComponent,
        PostReviewComponent,
        CDVPhotoLibraryPipe,
        SafeHtmlPipe,
        BriefContentDirective,
        FilledImagesDirective,
        MasonryDirective
    ],
    imports: [
        CommonModule,
        MaterialModule,
        IonicModule,
        CoreModule,
        PickerModule,
        EmojiModule,
        NgxMasonryModule
    ],
    exports: [
        MaterialModule,
        NgxMasonryModule,
        MessageBoxComponent,
        PostReviewComponent,
        CDVPhotoLibraryPipe,
        SafeHtmlPipe,
        BriefContentDirective,
        FilledImagesDirective,
        MasonryDirective
    ],
    entryComponents: [
        PostReviewComponent
    ],
    providers: [
    ],
})
export class SharedModule { }