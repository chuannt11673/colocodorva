import { SharedModule } from 'src/app/_shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatingPageRoutingModule } from './dating-routing.module';

import { DatingPage } from './dating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatingPageRoutingModule,
    SharedModule
  ],
  declarations: [DatingPage]
})
export class DatingPageModule {}
