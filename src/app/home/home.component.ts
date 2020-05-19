import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: any = [{
    username: '',
    password: ''
  }];


  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
    console.log(this.users);

  }

  getAllUsers(): any {
    return new Promise((resolve, reject) => {
      this.userService.getAllUsers().subscribe(data => {
        resolve(data);
        this.users = data as User[];
        //console.log(this.users);
      });
    });
  }
  delete(i) {
    this.userService.deleteUser(this.users[i].username).subscribe((response) => {
      // console.log("deleted");

    });
    this.ngOnInit();

  }

}
