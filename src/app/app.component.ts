import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bitraze';
  constructor(public router: Router) {}

  // Helper method to check if current route is login or signup
  hideBottomNav(): boolean {
    return this.router.url === '/login' || this.router.url === '/sign';
  }


}
