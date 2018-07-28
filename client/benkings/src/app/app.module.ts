import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule}  from '@angular/common/http';


import { AppComponent } from './app.component';
import { FilesModifiedComponent } from './files-modified/files-modified.component';


@NgModule({
  declarations: [
    AppComponent,
    FilesModifiedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
