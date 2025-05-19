import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  // 👇 rendre le getter public explicitement
  public get f() {
    return this.loginForm?.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.authService.login(this.f['username'].value, this.f['password'].value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
        this.loading = false;
      }
    });
  }
}
