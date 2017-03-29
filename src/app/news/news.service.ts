import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

// import { Post } from './post';

@Injectable()
export class NewsService {


  private _wpBase = "http://wp-stage.mineko.de/wp-json/wp/v2/";
  // private _wpMenu = "http://http://wp-stage.mineko.de//wp-json/wp-api-menus/v2/menus/2";

  constructor(private http: Http) { }

  // getMenus(){
  //   return this.http
  //     .get(this._wpMenu)
  //     .map((res: Response) => res.json());
  // }

  getHome(slug){
    return this.http
      .get(this._wpBase + `posts?slug=`+slug)
      // .get(this._wpBase + `pages/`+id)
      .map((res: Response) => res.json());
  }
  

  getNews(){

      return this.http
        .get(this._wpBase + 'posts')
        .map((res: Response) => res.json());

  }

  // getPost(slug): Observable<Post> {

  //     return this.http
  //       .get(this._wpBase + `posts?slug=${slug}`)
  //       .map((res: Response) => res.json());

  // }

}
