import { Component, OnInit } from '@angular/core';
import {ServicesService} from '.././services.service';
import {Observable} from 'rxjs/Observable'


@Component({
  selector: 'app-files-modified',
  templateUrl: './files-modified.component.html',
  styleUrls: ['./files-modified.component.css'],
  providers:[ServicesService]
})

export class FilesModifiedComponent implements OnInit {
public filesDep:any;
  constructor(private filesDeployed:ServicesService) { }

  ngOnInit() {
    this.filesDeployed.getFilesModified().subscribe((data:Object)=>{
        this.filesDep=data;
    });
  }

}
