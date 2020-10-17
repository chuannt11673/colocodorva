import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./tabs/diary/diary-detail/diary-detail.module').then(m => m.DiaryDetailPageModule)
  },
  {
    path: 'auth-callback',
    loadChildren: () => import('./auth-callback/auth-callback.module').then( m => m.AuthCallbackPageModule)
  },
  {
    path: 'new-post',
    loadChildren: () => import('./tabs/diary/new-diary/new-diary.module').then( m => m.NewDiaryPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
