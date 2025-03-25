import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder,private masterSrc: MasterService,private router: Router ) {
    this.loginForm = this.fb.group({
      usrId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    console.log("Form Status: ", this.loginForm.status);  // INVALID ya VALID
    console.log("Form Values: ", this.loginForm.value);
  
    if (this.loginForm.invalid) {
      console.log("Username and password are required.");
      return;
    }
  
    const { usrId, password } = this.loginForm.value;
    console.log('User ID:', usrId, 'Password:', password);
    
    this.masterSrc.login(usrId, password).subscribe(
      (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('token', (res as { token: string }).token);

        this.loginForm.reset();
  
        
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log('Login failed:', err);
        if (err.status === 400) {
          console.log('Validation error:', err.error.errors);
        }
      }
    );
  }
  
}
