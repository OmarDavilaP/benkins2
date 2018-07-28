import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public filesDeployed$: Observable<any>;
  constructor(){}

  title = 'app';

   gnOnInit(){
  }


}
