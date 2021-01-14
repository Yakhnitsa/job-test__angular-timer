import { Component,OnInit } from '@angular/core';
import {interval, SubscriptionLike} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-timer';
  subscription : SubscriptionLike | undefined;
  interval: number = 100;
  timerValue = 0;
  timerActive = false;

  start(){
    this.startAndSubscribe();
    if(this.timerActive){
      this.timerActive = false;
      this.timerValue = 0;
    }else{
      this.timerActive = true;
    }
  };
  wait(){
    this.timerActive = false;
  };
  reset(){
    this.startAndSubscribe();
    this.timerValue = 0;
    this.timerActive = true;
  }
  private startAndSubscribe(){
    this.unsubscribe();
    this.subscription = interval(this.interval)
      .subscribe( () =>{
        if(this.timerActive) this.timerValue += this.interval;
      })
  }
  private unsubscribe(){
    if(this.subscription){
      this.subscription.unsubscribe();
      // this.subscription = null;
    }

  }
  // private resetIntervalAndSubscribe(){
  //   // this.interval$ = interval()
  //   // this.interval$.subscribe( val =>{
  //   //     if(this.timerActive) this.timerValue++;
  //   //   })
  // }


  ngOnInit() {
    // this.interval$.subscribe(val =>{
    //   if(this.timerActive) this.timerValue++;
    // })
  }

}
