import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public navIsFixed: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = document.body.scrollTop;
    if (number > 0) {
      this.navIsFixed = true;
    } else {
      this.navIsFixed = false;
    }
  }

}
