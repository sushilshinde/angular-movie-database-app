import {Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoriesSelectModule } from '../categories-select.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import data from '../../data.json';
import { Router } from '@angular/router';

const genresList = new Set<string>();
data.movies.forEach(movie => {
  const genres = movie.details.genres;
  genres.forEach(genre => {
    if(!genresList.has(genre.name)){
      genresList.add(genre.name)
    }
  })
})


@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class DialogOverviewExample implements OnInit{
  genre!: string;
  name!: string;

  constructor(public dialog: MatDialog, private router: Router) {}
  ngOnInit(): void {
    
    const dialogRef = this.dialog.open(CategorySelectDialogComponent, {
      data: { genre: this.genre },
      enterAnimationDuration: 1200,
      exitAnimationDuration: 1200,
      height: '300px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.genre = result;

      if(this.genre) {
        this.router.navigate(['movies','category-list'], { state: { genre: this.genre }});
        console.log(this.genre)
      }else {
        this.router.navigate(['/movies']);
      }
    });
  }
}


interface GenreModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-category-select-dialog',
  templateUrl: './category-select-dialog.component.html',
  styleUrls: ['./category-select-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CategoriesSelectModule, MatSelectModule, CommonModule],
})
export class CategorySelectDialogComponent implements OnInit{
  genres!: GenreModel[];
  selectedGenre!: string;
  constructor(
    public dialogRef: MatDialogRef<CategorySelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.genres = [...genresList.values()].map(genre => ({ value: genre, viewValue: genre.toUpperCase() }));
    console.log(this.genres)

  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/movies']);
  }

}
