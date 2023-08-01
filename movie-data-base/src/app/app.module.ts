import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NofoundComponent } from './components/nofound/nofound.component';
import { MoviesListComponent } from './Movie/movies-list/movies-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TvShowsComponent } from './TvShows/TvShows.component';
import { HomeComponent } from './components/Home/Home.component';
import { SearchComponent } from './Movie/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NofoundComponent,
    NavbarComponent,
    MoviesListComponent,
    TvShowsComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
