import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesModifiedComponent } from './files-modified.component';

describe('FilesModifiedComponent', () => {
  let component: FilesModifiedComponent;
  let fixture: ComponentFixture<FilesModifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesModifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesModifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
