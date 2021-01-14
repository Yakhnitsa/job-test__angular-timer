import { Component,OnInit, OnDestroy } from '@angular/core';
import {interval, Subject, Subscription} from 'rxjs';
import {debounceTime, buffer, map, filter} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-timer';
  timerValue = 0;
  timerActive = false;

  private timerInterval = 100;
  private dblClickDuration = 300;
  private clickSubj$ = new Subject();
  private stopwatchSubsc : Subscription | undefined;
  private clickSubsc : Subscription | undefined;

  start(){
    this.startAndSubscribe();
    if(this.timerActive){
      this.timerActive = false;
      this.timerValue = 0;
    }else{
      this.timerActive = true;
    }
  };

  reset(){
    this.timerValue = 0;
    this.timerActive = true;
    this.startAndSubscribe();
  }

  doubleClick() {
    this.clickSubj$.next();
  }

  ngOnInit() {
    const doubleClick =
      this.clickSubj$.pipe(
        buffer( this.clickSubj$.pipe(debounceTime(this.dblClickDuration)) ),
        map(list => list.length),
        filter(x => x === 2)
      );
    this.clickSubsc = doubleClick.subscribe(() => this.timerActive = false);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
    if(this.clickSubsc){
      this.clickSubsc.unsubscribe();
    }
  }

  private startAndSubscribe(){
    this.unsubscribe();
    this.stopwatchSubsc = interval(this.timerInterval)
      .subscribe( () =>{
        if(this.timerActive) this.timerValue += this.timerInterval;
      })
  }

  private unsubscribe(){
    if(this.stopwatchSubsc){
      this.stopwatchSubsc.unsubscribe();
    }
  }
}
