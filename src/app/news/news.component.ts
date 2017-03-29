import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {

  news: string;
  main_head: any;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.news = this.route.snapshot.params['news'];
  }

  ngOnInit() {
    console.log(this.news)
    if(this.news){
      this.newsService.getHome(this.news).subscribe(res => {
        this.main_head = res[0].content.rendered;
      });
    }
    
  }

}
