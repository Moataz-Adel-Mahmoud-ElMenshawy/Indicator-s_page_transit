import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutUploadComponent } from './layout-upload.component';

describe('LayoutUploadComponent', () => {
  let component: LayoutUploadComponent;
  let fixture: ComponentFixture<LayoutUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
