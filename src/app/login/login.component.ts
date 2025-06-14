import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router'; //

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private service:ServicesService,private route:Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 onSubmit() {
  debugger;

  if (this.loginForm.valid) {
    this.service.onlogin(this.loginForm.value).subscribe({
      next: (res: any) => {
         console.log('res',res.token);
        localStorage.setItem('token', res.token);
        console.log('Login Successfully:',this.loginForm.value);
        this.route.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  } else {
    console.warn('Form is invalid');
  }
}

}
