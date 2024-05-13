import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionQuestComponent } from './expedition-quest.component';

describe('ExpeditionQuestComponent', () => {
  let component: ExpeditionQuestComponent;
  let fixture: ComponentFixture<ExpeditionQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpeditionQuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpeditionQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
