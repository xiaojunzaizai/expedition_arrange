import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionInfoComponent } from './expedition-info.component';

describe('ExpeditionInfoComponent', () => {
  let component: ExpeditionInfoComponent;
  let fixture: ComponentFixture<ExpeditionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpeditionInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpeditionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
