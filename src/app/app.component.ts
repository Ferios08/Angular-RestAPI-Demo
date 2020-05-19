import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  currentUser: User;

    constructor(
        private router: Router,
    ) {}

}