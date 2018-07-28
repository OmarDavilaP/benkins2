import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ServicesService {

  constructor(private myhttp:HttpClient) {}

  public getFilesModified():Observable<any>{

    return this.myhttp.get('http://localhost:3000/getFilesDeployed');

  }

}
