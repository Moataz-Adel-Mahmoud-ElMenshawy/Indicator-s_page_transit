import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFilesDataComponent } from './update-files-data.component';

describe('UpdateFilesDataComponent', () => {
  let component: UpdateFilesDataComponent;
  let fixture: ComponentFixture<UpdateFilesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFilesDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFilesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
