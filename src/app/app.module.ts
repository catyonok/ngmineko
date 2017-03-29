import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';
import { Step1Component } from './ticket/step1/step1.component';
import { Step2Component } from './ticket/step2/step2.component';
import { Step3Component } from './ticket/step3/step3.component';
import { Step2faxComponent } from './ticket/step2fax/step2fax.component';
import { Step2posComponent } from './ticket/step2pos/step2pos.component';
import { NewsComponent } from './news/news.component';
import { NewslistComponent } from './news/newslist/newslist.component';
import { NewspostComponent } from './news/newspost/newspost.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'news', component: NewslistComponent },
  { path: 'news/:news', component: NewsComponent },
  { path: 'ticket', component: TicketComponent, data: { title: 'Ticket' } },
  { path: 'ticket/:tick', component: TicketComponent },
  { path: 'ticket/:tick/:mode', component: TicketComponent },
  { path: 'ticket/:tick/:mode/:step', component: TicketComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

export const firebaseConfig = {
  apiKey: "AIzaSyDl1eObRZJAL-eWhe8A9Oy-sB0JrWuZ_MA",
  authDomain: "homepage-6cf8e.firebaseapp.com",
  databaseURL: "https://homepage-6cf8e.firebaseio.com",
  storageBucket: "homepage-6cf8e.appspot.com",
  messagingSenderId: "764410283825"
}

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    // console.log(this.sanitized.bypassSecurityTrustHtml(value))
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step2faxComponent,
    Step2posComponent,
    NewsComponent,
    SafeHtmlPipe,
    NewslistComponent,
    NewspostComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule, ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
