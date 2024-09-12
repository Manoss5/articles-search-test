import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Subject, Subscription } from 'rxjs';
import { Article } from '../../common/types/article';
import { search } from '../../common/pipes/search.pipe';
import { ArticlePreviewComponent } from '../../common/components/article-preview/article-preview.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ArticlePreviewComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, OnDestroy {
  articlesLoading = false;
  articles: Article[] = [];

  private searchTextSubject = new Subject<string>();
  private $subscriptions: Subscription[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.$subscriptions.push(
      this.searchTextSubject
        .pipe(
          search((value) => {
            this.articlesLoading = true;
            return this.articleService.search(value);
          })
        )
        .subscribe({
          next: (res) => {
            this.articles = [...res];
            this.articlesLoading = false;
          },
          error: (error) => {
            console.log('Articles did not load correctly', error);
            this.articlesLoading = false;
          },
        })
    );
  }

  ngOnDestroy() {
    this.$subscriptions.forEach((sub) => sub.unsubscribe());
  }

  searchArticles(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error('Something went wrong!');
    }
    this.searchTextSubject.next(event.target.value);
  }
}
