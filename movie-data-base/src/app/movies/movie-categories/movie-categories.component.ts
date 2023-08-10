import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-movie-categories',
  templateUrl: './movie-categories.component.html',
  styleUrls: ['./movie-categories.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class MovieCategoriesComponent{

  constructor(private store: Store<{ movies: { genres: string[] } }>) {}
}
