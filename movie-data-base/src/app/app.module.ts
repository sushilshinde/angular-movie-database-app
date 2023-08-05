import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { TvshowsComponent } from './tvshows/tvshows.component';
import { DialogOverviewExample } from './movies/movie-categories/category-select-dialog/category-select-dialog.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, NavbarComponent, TvshowsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    BrowserAnimationsModule,
    HttpClientModule,
    DialogOverviewExample
  ],
  // providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
