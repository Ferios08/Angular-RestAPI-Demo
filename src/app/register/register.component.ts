import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailExist: boolean;
  showMsg: boolean;
  msg = '';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    //private alerts: AlertsService
  ) { }

  initForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.initForm();
  }

  emailExists(username): any {
    return new Promise((resolve, reject) => {
      this.userService.getUser(username).subscribe(data => {
        this.emailExist = !(Object.entries(data).length === 0 && data.constructor === Object);
        resolve(data);
      });
    });
  }
  /////////////////////////////////
  register() {
    const formValue = this.registerForm.value;

    this.emailExists(formValue['username']).then(() => {
      if (!this.emailExist) {
        const user = new User(
          formValue['username'],
          formValue['password'],
        );
        this.userService.addUser(user);

        this.router.navigate(['login']);
      }
      else {
        this.msg = 'User Already Exist';
        this.showMsg = true;
      }

    })
  }

}
