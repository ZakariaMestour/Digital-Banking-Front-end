import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'e-banking-front-end';

  constructor(private authService:AuthService) {
  }
  ngOnInit(): void {
    this.authService.loadJwtTokenFromLocalStorage();
  }

}


