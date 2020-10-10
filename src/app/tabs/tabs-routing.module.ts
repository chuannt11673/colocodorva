import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'message',
        loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
      },
      {
        path: 'dating',
        loadChildren: () => import('./dating/dating.module').then( m => m.DatingPageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('./more/more.module').then( m => m.MorePageModule)
      },
      {
        path: 'diary',
        loadChildren: () => import('./diary/diary.module').then(m => m.DiaryPageModule)
      },
      {
        path: '',
        redirectTo: 'message',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
