import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriesSelectModule } from '../categories-select.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import data from '../../data.json';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const genresList = new Set<string>();
const movies = data.movies;
movies.forEach((movie: any) => {
  const genres = movie.details.genres;
  genres.forEach((genre: any) => {
    if (!genresList.has(genre.name)) {
      genresList.add(genre.name);
    }
  });
});

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
    MatOptionModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class DialogOverviewExample implements OnInit {
  genre!: string;
  name!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  openGenreDialog() {
    const dialogRef = this.dialog.open(CategorySelectDialogComponent, {
      data: { genre: this.genre },
      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000,
      height: '300px',
      width: '600px',
      position: {
        top: '0',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.genre = result;

      if (this.genre) {
        this.router.navigate(['category-list'], {
          state: { genre: this.genre },
          onSameUrlNavigation: 'reload',
        });
        console.log(this.genre);
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
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CategoriesSelectModule,
    MatSelectModule,
    CommonModule,
  ],
})
export class CategorySelectDialogComponent implements OnInit {
  genres!: GenreModel[];
  selectedGenre!: string;
  constructor(
    public dialogRef: MatDialogRef<CategorySelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.genres = [...genresList.values()].map((genre) => ({
      value: genre,
      viewValue: genre.toUpperCase(),
    }));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
