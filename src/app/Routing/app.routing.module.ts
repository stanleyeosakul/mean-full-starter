import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from '../Core/components/home/home.component';
import { SitemapComponent } from '../Core/components/sitemap/sitemap.component';
import { NotFoundComponent } from '../Core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guides', loadChildren: 'app/Guide/guide.module#GuideModule' },
  { path: 'books', loadChildren: 'app/Book/book.module#BookModule' },
  { path: 'users', loadChildren: 'app/User/user.module#UserModule' },
  { path: 'sitemap', component: SitemapComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
