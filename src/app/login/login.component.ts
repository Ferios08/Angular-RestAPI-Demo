import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailExist: boolean;
  showMsg: boolean;
  msg = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    //private alerts: AlertsService
  ) { }

  ngOnInit() {

    this.initForm();
  }


  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  emailExists(username): any {
    return new Promise((resolve, reject) => {
      this.userService.getUser(username).subscribe(data => {
        this.emailExist = !(Object.entries(data).length === 0 && data.constructor === Object);
        resolve(data);
      });
    });
  }


  login() {
    console.log
    const formValue = this.loginForm.value;
    this.emailExists(formValue['username']).then((res) => {
      if (this.emailExist) {
        if (formValue['password'] === res.password) {
          this.router.navigate(['home']);
        }
        else {
          this.incorrectPass();
        }
      }
      else {
        this.accountDoesntExistAlert();
      }
    });
  }

  async accountDoesntExistAlert() {
    this.msg = 'User 404';
    this.showMsg = true;
  }

  async incorrectPass() {
    this.msg = 'Incorrect password';
    this.showMsg = true;
  }
}
