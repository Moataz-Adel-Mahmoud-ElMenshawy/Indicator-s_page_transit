import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFoldersComponent } from './upload-folders.component';

describe('UploadFoldersComponent', () => {
  let component: UploadFoldersComponent;
  let fixture: ComponentFixture<UploadFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadFoldersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
