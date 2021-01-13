import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-timer';
  timerValue = '00:00:31'
  timerActive = true;

  start(){
    console.log('timer started')
  };
  wait(){
    console.log('timer stopped')
  };
  reset(){
    console.log('timer reset')
  }

}
