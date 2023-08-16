import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CategorySelectDialogComponent } from './category-select-dialog.component';

describe('CategorySelectDialogComponent', () => {
  let component: CategorySelectDialogComponent;
  let fixture: ComponentFixture<CategorySelectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategorySelectDialogComponent, MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatSelectModule,
        CommonModule,],
    });
    fixture = TestBed.createComponent(CategorySelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
