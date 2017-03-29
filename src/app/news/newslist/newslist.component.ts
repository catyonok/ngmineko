import { Component } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: [ './newslist.component.css' ],
  providers: [ NewsService ]
})
export class NewslistComponent {

  news: any;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { 
    this.newsService.getNews().subscribe(res => {
      this.news = res;
    });
  }

  goNews(slug) {
    var news = 'news/'+slug
  	this.router.navigate([news]);
  }

}
