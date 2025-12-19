import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from './register-request';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{
  form!: UntypedFormGroup;
  
    constructor(private authService: AuthService, private router: Router) {}
  
    ngOnInit(): void {
      this.form = new UntypedFormGroup({
        first: new FormControl('', Validators.required),
        last: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        phoneNumber: new FormControl(''),
        password: new FormControl('', Validators.required)
      });
    }
  
    onSubmit(): void {
      let registerRequest = <RegisterRequest> {
        fullName: this.form.controls["first"].value + " " + this.form.controls["last"].value,
        email: this.form.controls["email"].value,
        phoneNumber: this.form.controls["phoneNumber"].value ? this.form.controls["phoneNumber"].value : null,
        password: this.form.controls["password"].value
      };
  
      this.authService.register(registerRequest).subscribe({
        next: result => {
          console.log(result);
          this.router.navigateByUrl("/");
        },
        error: result => {
          console.log("Error: " + result);
        }
      })
    }
}
