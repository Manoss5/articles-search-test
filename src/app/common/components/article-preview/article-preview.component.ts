import { Component, Input } from '@angular/core';
import { Article } from '../../types/article';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.css',
})
export class ArticlePreviewComponent {
  @Input({ required: true }) article: Article = {
    id: 0,
    title: '',
    preview: '',
    description: '',
    body: '',
  };

  constructor() {}
}
