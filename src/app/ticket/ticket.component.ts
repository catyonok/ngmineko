import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit {

  ngOnInit() {
    // window.onbeforeunload = function(e) {
    //   var dialogText = 'Dialog text here';
    //   e.returnValue = dialogText;
    //   return dialogText;
    // };
  }

  onlineStep1: FirebaseObjectObservable<any>;
  onlineStep2: FirebaseObjectObservable<any>;
  onlineStep3: FirebaseObjectObservable<any>;
  onlineStep4: FirebaseObjectObservable<any>;

  public myTick = '';
  public myMode = '';
  public myStep = '';
  public onStep = 0;
  public onMode = 0;

  constructor(
    af: AngularFire,
    private router: Router,
    private route:ActivatedRoute
  ){
    this.onlineStep1 = af.database.object('/mode/online/step1');
    this.onlineStep2 = af.database.object('/mode/online/step2');
    this.onlineStep3 = af.database.object('/mode/online/step3');
    this.onlineStep4 = af.database.object('/mode/online/step4');

    router.events.subscribe((val) => {
      this.myTick = this.route.snapshot.params['tick'];
      this.myMode = this.route.snapshot.params['mode'];
      this.myStep = this.route.snapshot.params['step'];
      if(this.myMode=='online'){this.onMode=0}
      if(this.myMode=='post'){this.onMode=1}
      if(this.myMode=='fax'){this.onMode=2}
      if(this.myStep=='step1'){this.onStep=0}
      if(this.myStep=='step2'){this.onStep=1}
      if(this.myStep=='step3'){this.onStep=2}
      if(this.myStep=='step4'){this.onStep=3}
    });

  }

  onMODE(mode) {
    if(mode==0){this.myMode='online'}
    if(mode==1){this.myMode='post'}
    if(mode==2){this.myMode='fax'}
    if(this.myTick==undefined){this.myTick='new';}
    this.onStep=0;
    this.router.navigate(['/ticket/'+this.myTick+'/'+this.myMode+'/step1']);
  }
  prevSTEP(step) {
    this.onStep -=1;
    this.router.navigate(['/ticket/'+this.myTick+'/'+this.myMode+'/step'+(this.onStep+1)]);
  }
  // nextSTEP() {
  //   this.onStep +=1;
  //   if(this.myMode==undefined){this.myMode='online'}
  //   if(this.myTick==undefined){this.myTick = Math.floor((1 + Math.random()) * 0x10000000000).toString(16).substring(1);}
  //   this.router.navigate(['/ticket/'+this.myTick+'/'+this.myMode+'/step'+(this.onStep+1)]);
  // }

}
