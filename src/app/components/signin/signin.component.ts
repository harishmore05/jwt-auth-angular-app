import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("SignIn | JWT Auth")
  }

  signIn(f: NgForm) {
    let formData = JSON.stringify(f.value)
    this.auth.signin(formData)
    .subscribe(
      data => {
        localStorage.setItem('token', data['token'])
        this.toastr.success("Login Success..")
        this.router.navigateByUrl('home')
      },
      err => {
        this.toastr.error(err.error.message)
      }
    )
  }
}
