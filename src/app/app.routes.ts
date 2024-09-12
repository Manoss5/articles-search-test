import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ArticleComponent } from './pages/article/article.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
