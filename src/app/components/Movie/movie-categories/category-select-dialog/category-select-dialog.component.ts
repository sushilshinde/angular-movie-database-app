import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import data from '../../data.json';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';

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

/* The `GenreSelectDialog` class is a TypeScript component that represents a dialog for selecting a
genre and navigating to a category list based on the selected genre. */
@Component({
  selector: 'genre-select-dialog',
  templateUrl: './genre-select-dialog.html',
  styleUrls: ['./category-select-dialog.component.css'],
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
export class GenreSelectDialog implements OnInit, OnDestroy {
  genre!: string;
  name!: string;
  closeDialogSubscription?: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  /**
   * The function `openGenreDialog()` opens a dialog box with a category select component, allowing the
   * user to choose a genre and navigate to the category list page with the selected genre.
   */
  openGenreDialog() {
    const dialogRef = this.dialog.open(CategorySelectDialogComponent, {
      data: { genre: this.genre },
      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000,
      height: '300px',
      width: '600px',
      backdropClass: 'dialogOverlay',
      panelClass: 'dialogPanel'
    });

    this.closeDialogSubscription = dialogRef.afterClosed().subscribe((result) => {
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

  ngOnDestroy(): void {
    this.closeDialogSubscription?.unsubscribe()
  }
}

/* The `GenreModel` interface is defining the structure of an object that represents a genre in the
application. It has two properties: `value` and `viewValue`. */
interface GenreModel {
  value: string;
  viewValue: string;
}

/* The CategorySelectDialogComponent is a TypeScript component that represents a dialog for selecting a
category, with a list of genres and the ability to close the dialog. */
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
