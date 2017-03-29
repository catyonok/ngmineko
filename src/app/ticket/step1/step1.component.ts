import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { emailValidator, matchingPasswords } from '../ticket.validator';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  
  step1Push: FirebaseListObservable<any>;
  step1Upd: FirebaseListObservable<any>;
  step1Upd2: FirebaseListObservable<any>;

  myTick = '';
  myMode = '';
  myStep = '';
  onStep = 0;
  onMode = 0;

  samemails:boolean = true;
  submitted:boolean = false;
  form: FormGroup;

  ngOnInit() {
  }

  constructor(
    private af: AngularFire,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.step1Push = af.database.list('/ticket');
    this.myTick = this.route.snapshot.params['tick'];
    this.step1Upd = af.database.list('/ticket/'+this.myTick+'/step1');
    this.step1Upd2 = af.database.list('/ticket/'+this.myTick);

    if(this.myTick==undefined){this.myTick='new';}

    this.myMode = this.route.snapshot.params['mode'];
    this.myStep = this.route.snapshot.params['step'];

    if(this.myMode=='online'){this.onMode=0}
    if(this.myMode=='post'){this.onMode=1}
    if(this.myMode=='fax'){this.onMode=2}

    if(this.myStep=='step1'){this.onStep=0}
    if(this.myStep=='step2'){this.onStep=1}
    if(this.myStep=='step3'){this.onStep=2}
    if(this.myStep=='step4'){this.onStep=3}

    this.form = fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      surname: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required, 
        emailValidator,
        ]
      ],
      remail: ['', [
        Validators.required, 
        emailValidator,
        ]
      ],
      comment: [''],
      agree: ['', Validators.required],
    }, {validator: matchingPasswords('email', 'remail')});

    if(this.myTick!=undefined && this.myTick!='new'){
      this.step1Upd.subscribe(items => { 
          items.forEach(item => {
            this.form.controls[item.$key].setValue(item.$value);
          })
      })
    }else{
      // this.form.reset();
    }

  }  

  onSubmit() {
    this.submitted = true;
    if(this.form.valid){
      if(this.form.controls['email'].value != this.form.controls['remail'].value){
        this.samemails=false;
      }else{
        this.samemails=true;
        if(this.myMode==undefined){this.myMode='online'}
        if(this.myTick==undefined || this.myTick=='new'){
          this.step1Push.push({ step1:this.form.value }).then((item) => {
            this.myTick=item.key;
            this.router.navigate(['/ticket/'+this.myTick+'/'+this.myMode+'/step2']);
          });
        }else{
          this.step1Upd2.update('step1', { 
            name:this.form.controls['name'].value,
            surname:this.form.controls['surname'].value,
            email:this.form.controls['email'].value,
            remail:this.form.controls['remail'].value,
            comment:this.form.controls['comment'].value,
            agree:this.form.controls['agree'].value,
          }).then((item) => {
            this.router.navigate(['/ticket/'+this.myTick+'/'+this.myMode+'/step2']);
          });
        }
      }
    }
  }

}
