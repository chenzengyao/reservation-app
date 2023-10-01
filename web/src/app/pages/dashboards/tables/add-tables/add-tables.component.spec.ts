import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTablesComponent } from './add-tables.component';

describe('AddTablesComponent', () => {
  let component: AddTablesComponent;
  let fixture: ComponentFixture<AddTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
