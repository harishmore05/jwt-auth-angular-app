import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @Output() userEmitEvent:EventEmitter<User[]> = new EventEmitter<User[]>();

  users: User[];
  constructor(
    private title: Title,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Home | JWT Auth");
    this.userService.requestUsers()
    .subscribe(
      data => {
        this.users = data['users']
        // console.log(this.users)
        // this.userEmitEvent.emit(this.users)
      }
    )
  }
}
