import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {

  qid:any;
  constructor(private _locationSt:LocationStrategy, private _route:ActivatedRoute){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid= this._route.snapshot.params['qid'];
  }

  preventBackButton(){
    history.pushState(null, '', location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null, '', location.href);
    });
  }

}
