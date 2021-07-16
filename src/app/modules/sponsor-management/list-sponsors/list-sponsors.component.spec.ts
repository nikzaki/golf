import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSponsorsComponent } from './list-sponsors.component';

describe('ListSponsorsComponent', () => {
  let component: ListSponsorsComponent;
  let fixture: ComponentFixture<ListSponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSponsorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
