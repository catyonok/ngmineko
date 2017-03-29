import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  
  onCard = 0;

  constructor(
    af: AngularFire,
  ){
    
  }

  ngOnInit() {
    
  }

  onSubmit() {
    
  }

}
