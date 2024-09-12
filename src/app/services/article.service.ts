import { Injectable } from '@angular/core';
import { delay, filter, map, of } from 'rxjs';
import data from '../../../articles.json';
import ArticleResponseMapper from '../common/mappers/article-response.mapper';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor() {}

  search(value: string) {
    // I added this to show when the search happens
    console.log('Searching for ' + value);

    // I added the delay to simulate the response delay
    // so that I can also show a loader text
    return of(data.articles).pipe(
      map((res) => res.map((data) => ArticleResponseMapper(data))),
      delay(1000)
    );
  }

  getSingleArticleData(id: number) {
    return of(data.articles.find((article) => article.id === id)).pipe(
      filter((res) => !!res),
      map((res) => ArticleResponseMapper(res))
    );
  }
}
