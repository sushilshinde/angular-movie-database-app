import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  //subscribetoRouterEvents() calling every time a new route change in paths
  ngOnInit() {
    this.subscribeToRouterEvents();
  }

  private subscribeToRouterEvents() {
    //in event of routing any change in NavigationEnd it occurs and called this.scrollToTop()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }

  //scroll to top when new route path change
  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
