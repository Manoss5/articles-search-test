import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Article } from '../../common/types/article';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit, OnDestroy {
  article?: Article;

  private $subscriptions: Subscription[] = [];
  private articleId?: number;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {
    this.$subscriptions.push(
      this.activatedRoute.params
        .pipe(map((p) => p['id']))
        .subscribe((res) => (this.articleId = Number(res)))
    );
  }

  ngOnInit() {
    this.getArticleData();
  }

  ngOnDestroy() {
    this.$subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getArticleData() {
    if (!this.articleId || isNaN(this.articleId)) {
      return (this.article = undefined);
    }
    this.$subscriptions.push(
      this.articleService
        .getSingleArticleData(this.articleId)
        .subscribe((res) => (this.article = res))
    );
  }
}
