import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  inputs: ['activeColor', 'baseColor', 'overlayColor']
})
export class Step2Component {

  form: FormGroup;
  submitted = false;
  doctypes = [
    { value: 'nebenkostenabrechnung', viewValue: 'Nebenkostenabrechnung' },
    { value: 'mietvertrag', viewValue: 'Mietvertrag' },
    { value: 'zusatzvereinbarung', viewValue: 'Zusatzvereinbarung(en)' }
  ];

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';

  dragging: boolean = false;
  // loaded: boolean = false;
  // imageLoaded: boolean = false;
  // imageSrc: string = '';

  files: any = [];
  filen: number = 0;
  filetoload: number = 0;
  loading: boolean = false;

  step2Items: FirebaseListObservable<any>;
  step2Get: FirebaseListObservable<any>;
  myTick = '';
  myMode = '';

  constructor(
    public af: AngularFire,
    private router: Router,
    private route:ActivatedRoute,
    public builder: FormBuilder
  ) {
    this.myTick = this.route.snapshot.params['tick'];
    this.step2Items = af.database.list('/ticket/'+this.myTick);
    this.step2Get = af.database.list('/ticket/'+this.myTick+'/step2');
    this.myMode = this.route.snapshot.params['mode'];
    this.form = this.builder.group({});
    this.step2Get.forEach(items => {
      this.filen=0;
      items.forEach(item => {
        this.form.addControl(item.id, new FormControl(item.kind, [Validators.required, ]));
        this.filen += 1;
      })      
    });
  }

  handleDragEnter() {this.dragging = true;}
  handleDragLeave() {this.dragging = false;}
  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }
  handleInputChange(event) {
    var filez = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    var totfile = this.filen+filez.length;
    this.loading=true;
    console.log(filez.length)
    this.filetoload = filez.length;
    for (let selectedFile of filez) {
        var entry = {
          'id': '',
          'name': selectedFile.name,
          'kind': '',
          'url': '',
        };
        this.step2Get.push(entry).then((item1) => {
          var filekey = item1.key;
          var storageRef = firebase.storage().ref('/mineko/'+this.myTick+'/'+filekey);
          storageRef.put(selectedFile).then((item2) => {
            this.step2Get.update(filekey, { 
              id: filekey,
              url: 'https://firebasestorage.googleapis.com/v0/b/homepage-6cf8e.appspot.com/o/mineko%2F'+this.myTick+'%2F'+filekey+'?alt=media&token=cc1e7a6d-2329-4351-897f-922485c719df'
            }).then((item) => {
              this.filetoload-=1;
              if(totfile==this.filen){this.loading=false;}
            });
          });
        });
    }
  }

  goDoc(url){
    window.open(url, '_blank');
  }

  fileDelete(file) {
    this.filetoload = 1;
    this.loading=true;
    var storageRef = firebase.storage().ref('/mineko/'+this.myTick+'/'+file.id);
    storageRef.delete().then((item2) => {
      this.step2Get.remove(file);
      this.form.removeControl(file.id);
      this.loading=false;
    });
  }

	onSubmit() {
    this.submitted=true;
    if(this.form.controls['']){
      this.form.removeControl('');
    }
    if(this.form.valid && this.filen>0){
      this.submitted=false;
      this.step2Get.forEach(items => {
        items.forEach(item => {
          this.step2Get.update(item.$key, { 
            kind:this.form.controls[item.id].value,
          }).then((item) => {
            this.router.navigate(['/ticket/'+this.myTick+'/'+this.myMode+'/step3']);
          });
        })
      })
    }
  }

}
